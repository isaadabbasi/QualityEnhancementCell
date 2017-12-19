import { Component, ViewContainerRef, ViewChild } from '@angular/core';

import { Subscribable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

import { each, map } from 'lodash';

import { TEACHER_DETAILS_URL, 
         Departments as DepartmentsList, 
         TEACHER_BASE_URL, 
         ADMIN_BASE_URL, 
         ADD_ADMIN,
         PREFERENCES} from './../../../shared/global-vars';
    
import { SharedService } from './../../../shared/shared.service';
import { AutoUnsubscribe } from '../../../decorators/AutoUnsubscribe';

import { ModalComponent } from '../../../modal/modal.component';
import { ModalComponentFactory } from './../../../modal/modal.service';
import { modalOptionsModel } from './../../../modal/modal.interface';

@Component({
    selector: 'settings',
    templateUrl: './settings.html',
    styleUrls: [
        './settings.css'
    ]

})
@AutoUnsubscribe()
export class SettingsComponent {
    allAdmins           : any;
    enableAdminDelete   : boolean = true;
    @ViewChild('modal', {read: ViewContainerRef}) container: ViewContainerRef;
    
    topMenu = [
        'admin',
        'teacher',
        'survey',
        'student'
    ];

    sessionDetails: Map<string, any> = new Map();
    allTeachers: Array<{
        _id         : string, 
        fullname    : string, 
        operation   : string,
        subjects    : Array<string>, 
        departments : Array<string>
    }>;

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
        },
        tbody:{
            display: true,
            tr:[{
                td: [{
                    class: 'text-center',
                    text: 'Name'
                },{
                    class: 'text-center',
                    text: 'Department'
                },{
                    class: 'text-center bg-danger',
                    text: 'Operations',
                    operation: true,
                    opsClass: 'text-danger'
                }]
            }]
        }
    };

    constructor(private sharedService: SharedService,
                private modalCF: ModalComponentFactory
    ) {
        
    }
    ngOnInit(){

        this.enableAdminDelete = 
            JSON.parse(localStorage.getItem('activeUser'))["root"]
        this.getAdmins();        
    }
    getTeachers(){
        let 
            teachers:Array<{
                _id         : string, 
                fullname    : string, 
                operation   : string,
                subjects    : Array<string>, 
                departments : Array<string>
            }> = [];

        this.sharedService.getCall(TEACHER_DETAILS_URL)
        .subscribe(
            next => {
                each(next, teacher =>{
                    let {_id, fullname, departments, subjects, operation='delete'} = teacher;
                    teachers.push({_id, fullname, departments, subjects, operation})
                });

                this.allTeachers = teachers;
            }
        ),console.error
    }
    
    delete(whois, id, root?: boolean){
        let activeAdminID = JSON.parse(localStorage.getItem('activeUser'))["_id"];
        
        if(
            (whois.toLowerCase() === 'admin' && root) ||
            (whois.toLowerCase() === 'admin' && 
             id === activeAdminID) 
        ){
            let modalOptions: modalOptionsModel = {
                metaData: {
                    labels: false,
                    setOnTop: true,
                    type: 'confirm'  
                },
                header: `Delete ${whois}`,
                body:{
                    html:{
                        p: [
                            'Sorry you can not perform this action.'
                        ],
                    }
                },
                footer: [{
                    type: 'button',
                    label: 'Cancel',
                    id: 'cancel',
                    icon: 'fa fa-times'
                }]
            }
            this.modalCF.generateModal(this.container, modalOptions);
        }
        else{
            this.enableAdminDelete = true;
            let modalOptions: modalOptionsModel = {
                metaData: {
                    labels: false,
                    setOnTop: true,
                    type: 'confirm'  
                },
                header: `Delete ${whois}`,
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
                        if(output.get('status') != 'cancel'){
                            let URL = 
                                whois.toLowerCase() === 'teacher' ? 
                                    `${TEACHER_BASE_URL}/${id}` : 
                                    `${ADMIN_BASE_URL}/${activeAdminID}/${id}`;
    
                            this.sharedService.deleteCall(URL)
                                .switchMap(
                                    () => this.sharedService.getCall(
                                        whois.toLowerCase() === 'teacher'? 
                                            TEACHER_DETAILS_URL:
                                            `${ADMIN_BASE_URL}/${activeAdminID}`
                                    )
                                ).subscribe(
                                    res => {
                                        whois.toLowerCase() === 'teacher'? 
                                            this.allTeachers = res:
                                            this.allAdmins = res;
                                    }
                            )
                        }
                        
                    }
                )
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
                    sendTeacherDetails(`${TEACHER_BASE_URL}/add`, teacher)
                }
          });
        
            let sendTeacherDetails = (URL, teacher) => {
                this.sharedService.postCall(URL, teacher)
                    .switchMap(() => this.sharedService.getCall(TEACHER_DETAILS_URL))
                    .subscribe(
                        res => this.allTeachers = res
                    ),
                    console.error
            }
        }
    

    getAdmins(){
        let URL = `${ADMIN_BASE_URL}/${JSON.parse(localStorage.getItem('activeUser'))["_id"]}`;
        this.sharedService.getCall(URL)
            .subscribe( next => this.allAdmins = next)
        
    }

    addAdmin(){
        let modalOptions = {
            metaData: {
              chaining: false,
              labels: false,
              setOnTop: true
            },
            header: 'Add new admin',
            body: [{
                    type: 'email',
                    label: 'Email',
                    placeholder: 'Email',
                    id: 'email'
                },{
                    type: 'password',
                    label: 'Password',
                    placeholder: 'Password',
                    id: 'password'
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
                    let admin = {
                        email: output.get('email'),
                        password: output.get('password'),
                    },
                    URL = `${ADD_ADMIN}/${JSON.parse(localStorage.getItem('activeUser'))["_id"]}`;
                    
                    sendAdminDetails(URL , admin)
                }
          });
        
            let sendAdminDetails = (URL, admin) => {

                let getURL = `${ADMIN_BASE_URL}/${JSON.parse(localStorage.getItem('activeUser'))["_id"]}`;
                
                this.sharedService.postCall(URL, admin)
                    .switchMap(() => this.sharedService.getCall(getURL))
                    .subscribe(
                        res => this.allAdmins = res
                    ),
                    console.error
            }
    }
    sessionStatus(value){
        this.sharedService.putCall(
            `${PREFERENCES}/${this.sessionDetails.get('id')}`,
            {session: value}
        ).subscribe(
            console.log
        )
    }
    getSessionStatus(){
        
        this.sharedService.getCall(PREFERENCES)
        .subscribe(next => {
            this.sessionDetails
                .set('status', next.session)
                .set('id', next["_id"]);
        },
            console.error
        );
    }
}