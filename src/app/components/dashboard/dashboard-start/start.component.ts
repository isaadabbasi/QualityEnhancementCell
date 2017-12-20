import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, ViewContainerRef, ElementRef } from '@angular/core';

import { StudentModel, DeparmentsListItemModel } from "./../../../shared/models";
import { TeacherModel } from "./../../../shared/models";
import { SharedService } from './../../../shared/shared.service';
import { ModalComponentFactory } from './../../../modal/modal.service';
import { TEACHER_DETAILS_URL, Departments } from './../../../shared/global-vars';

@Component({
    templateUrl: './start.template.html',
    styleUrls:[ '../../login/login.component.css' ]
})
export class StartSurveyComponent implements OnInit {
    
    @ViewChild('modal', {read: ViewContainerRef}) container: ViewContainerRef;    

    year                : number;

    month               : String = '';
    selectedTeacher     : string = '';
    subject             : string = '';

    teachers            : boolean;
    subjects            : boolean;
    
    teachersList        : any;
    selectedDepartment  : any = '';
    subjectsList        : any;

    deparmentsList      : Array<DeparmentsListItemModel> = Departments;

    surveyMetaData      : {evaluation: string, course: string, teacher: string}
        = {evaluation: "", course: "", teacher: ""};

    @ViewChild('dept') 
        deptReference   : ElementRef;  

    months              :Array<String> =
        ["January", "February", "March", "April", "May", "June","July","August", "September", "October", "November", "December"];

    constructor(private sharedService: SharedService,
                private router: Router,
                private modalCF: ModalComponentFactory
            ) { 
        this.year   = new Date().getFullYear();
        this.month  = this.months[new Date().getMonth()];
        
    }

    getDepartmentTeacherList(department){
        this.sharedService.getCall(`${TEACHER_DETAILS_URL}?department=${department}`)
            .subscribe( res => {
                    this.teachers       = false;
                    this.teachersList   = res;
            },
            console.error
        )
    }
    
    getSubjectList(selectedTeacher){ // need to rewrite with real logic, bluffing DOM for now.
        this.subjects               = !selectedTeacher ? false : true;
        this.selectedTeacher        = selectedTeacher;
        this.surveyMetaData.course  = selectedTeacher;

        let teacherObject           = 
            (this.teachersList)
                .find(o => o["fullname"] === selectedTeacher);
        
        this.subjectsList           = teacherObject ? teacherObject["subjects"] : null;
    }

    selectedSubject(selectedSubject){
        this.subject = selectedSubject;
    
        if(!!this.subject){
            this.surveyMetaData.evaluation  = "course",
            this.surveyMetaData.course      = this.subject,
            this.surveyMetaData.teacher     = this.selectedTeacher;
        }
    }
    validate(){
        return !!this.surveyMetaData.teacher && !!this.surveyMetaData.course;               
    }

    startSession(){
        if(this.validate()){
            
            let modalOptions = {
                metaData: {
                    chaining: false,
                    labels: false,
                    setOnTop: true
                  },
                  header: 'Select Evaluation Type',
                  body: [{
                    type: 'radio',
                    label: 'Teacher Evaluation',
                    id: 'teacher',
                    value: 'teacher',
                    name: 'evaluation'
                  },{
                    type: 'radio',
                    label: 'Course Evaluation',
                    id: 'course',
                    value: 'course',
                    name: 'evaluation'
                  }],
                  footer: [{
                    type: 'button',
                    label: 'Start Survey',
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
                    res => {
                        if(res.get("status") !== 'cancel'){
                            this.surveyMetaData.evaluation = res.get('evaluation')
                            localStorage.setItem('surveyMetaData', JSON.stringify(this.surveyMetaData));
                            if(res.get('evaluation'))
                                this.router.navigate(['/survey'])
                        }
                    }
                    
                )
        }
    } 
    ngOnInit() {
        localStorage.removeItem('surveyMetaData');
        let activeUser: StudentModel    = JSON.parse(localStorage.getItem('activeUser'));
        this.selectedDepartment         = 
            (this.deparmentsList.
                find(department => department["value"] == activeUser.department))["name"];
        this.getDepartmentTeacherList(activeUser.department);
     }
}