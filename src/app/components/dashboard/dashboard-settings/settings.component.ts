import { Component, ViewContainerRef, ViewChild } from '@angular/core';
import { Subscribable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap'

import { TEACHER_DETAILS_URL, Departments as DepartmentsList, TEACHER_BASE_URL } from './../../../shared/global-vars';

import { SharedService } from './../../../shared/shared.service';

import { ModalComponent } from '../../../modal/modal.component';
import { ModalComponentFactory } from './../../../modal/modal.service';

@Component({
    selector: 'settings',
    templateUrl: './settings.html',

})
export class SettingsComponent {

    @ViewChild('modal', {read: ViewContainerRef}) container: ViewContainerRef;
    
    topMenu = [
        'admin',
        'teacher',
        'survey',
        'student'
    ]

    options = {
        metaData: {
            tableClass: 'table table-hover table-condensed table-responsive'
        },
        thead: {
            display: true,
            tr:[{
                th: [{
                    class: 'text-center',
                    text: 'Name'
                },{
                    class: 'text-center',
                    text: 'Department'
                },{
                    class: 'text-center',
                    text: 'Operations'
                }]
            }]
        }
    }

    allTeachers: Array<Object>;
    constructor(private sharedService: SharedService,
                private modalCF: ModalComponentFactory
    ) {
        
    }
    ngOnInit(){
        
    }
    getTeachers(){
        this.sharedService.getCall(TEACHER_DETAILS_URL)
        .subscribe(
            next => {
                this.allTeachers = next;
            }
        ),
        err => console.error(err),
        () => console.error(this.allTeachers)
        
    }
    
    delete(teacherId){
        
        console.info(teacherId)
        let modalOptions = {
            metaData: {
                labels: false,
                setOnTop: true,
                type: 'confirm'  
            },
            header: 'Delete Teacher',
            body:{
                html:{
                    h1: [
                        'Are you sure?'
                    ],
                    p: [
                        'This will delete the teacher and all related details.',
                        'You can not undo this action.'
                    ],
                }
            },
            footer: [{
                type: 'button',
                label: 'Yes, I am sure.',
                id: 'submit',
                icon: 'fa fa-check'
            },{
                type: 'button',
                label: 'Cancel',
                id: 'cancel',
                icon: 'fa fa-times'
            }]
        }
        this.modalCF.generateModal(this.container, modalOptions)
            .subscribe(
                output => {
                    if(output.get('status') != 'cancel')
                    this.sharedService.deleteCall(`${TEACHER_BASE_URL}/${teacherId}`)
                        .switchMap(() => this.sharedService.getCall(TEACHER_DETAILS_URL))
                        .subscribe(
                            res => {
                                this.allTeachers = res

                            }
                    )
                }
            )
    }
    
    modalState(value) {
        if(!value){
            this.getTeachers();
        }
    }
    addTeacher(){
        let modalOptions = {
            metaData: {
              chaining: false,
              labels: false,
              setOnTop: true
            },
            header: 'Add new teacher',
            body: [{
                    type: 'text',
                    label: 'Full name',
                    placeholder: 'Full name',
                    id: 'fullname'
                },{
                    type: 'text',
                    label: 'Designation',
                    placeholder: 'Designation',
                    id: 'designation'
                },{
                    type: 'text',
                    label: 'Subjects',
                    placeholder: 'Subjects',
                    id: 'subjects'
                },{
                    type: 'text',
                    label: 'Departments',
                    placeholder: 'Departments',
                    id: 'departments'
                }
            ],
            footer: [{
                    type: 'button',
                    label: 'Submit',
                    id: 'submit',
                    icon: 'fa fa-check'
                },{
                    type: 'button',
                    label: 'Cancel',
                    id: 'cancel',
                    icon: 'fa fa-times'
                }
            ]
          };
          this.modalCF.generateModal(this.container, modalOptions)
            .subscribe(
                output => {
                if(output.get('status') != 'cancel'){
                    let teacher = {
                        fullname: output.get('fullname'),
                        designation: output.get('designation'),
                        subjects: output.get('subjects').split(','),
                        departments: output.get('departments').split(',')  
                    }
                    this.sendTeacherDetails(`${TEACHER_BASE_URL}/add`, teacher)
                }
          });
    
        }
    
    sendTeacherDetails(URL, teacher){
        this.sharedService.postCall(URL, teacher)
            .switchMap(() => this.sharedService.getCall(TEACHER_DETAILS_URL))
            .subscribe(
                res => this.allTeachers = res
            ),
            console.error
    }
}