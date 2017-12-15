import { ModalComponentFactory } from './../../../modal/modal.service';
import { Router } from '@angular/router';
import { TEACHER_DETAILS_URL, Departments } from './../../../shared/global-vars';
import { SharedService } from './../../../shared/shared.service';
import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { StudentModel } from "./../../../shared/models";
import { TeacherModel } from "./../../../shared/models";

@Component({
    templateUrl: './start.template.html',
    styleUrls:[ '../../login/login.component.css' ]
})
export class StartSurveyComponent implements OnInit {
    @ViewChild('modal', {read: ViewContainerRef}) container: ViewContainerRef;    

    year: number;
    month: String;
    teachers: boolean;
    teachersList;
    selectedDepartment: any = '';
    selectedTeacher: string = '';
    subject: string;
    subjects: boolean;
    subjectsList;
    deparmentsList = Departments;
    surveyMetaData = {
        evaluation: "",
        course: "",
        teacher: ""
    }
    @ViewChild('dept') deptReference;  
    months:Array<String> = ["January", "February", "March", "April", "May", "June","July","August", "September", "October", "November", "December"];
    constructor(private sharedService: SharedService,
                private router: Router,
                private modalCF: ModalComponentFactory
            ) { 
        this.year = new Date().getFullYear();
        this.month = this.months[new Date().getMonth()];
        
    }

    getDepartmentTeacherList(department){
        this.sharedService.getCall(`${TEACHER_DETAILS_URL}?department=${department}`)
            .subscribe( res => {
                console.log(res)
                    this.teachersList = res;
                    this.teachers = false;
            }, err => {
                console.error(err);
            });
    }
    getSubjectList(selectedTeacher){ // need to rewrite with real logic, bluffing DOM for now.
        this.subjects = !selectedTeacher ? false : true;
        this.selectedTeacher = selectedTeacher;
        this.surveyMetaData.course= selectedTeacher;
        let teacherObject = (this.teachersList).find(o => o["fullname"] === selectedTeacher) ;
        this.subjectsList = teacherObject ? teacherObject["subjects"] : undefined;
    }
    selectedSubject(selectedSubject){
        this.subject = selectedSubject;
        if(!!this.subject){
            this.surveyMetaData.course = this.subject,
            this.surveyMetaData.evaluation = "course",
            this.surveyMetaData.teacher = this.selectedTeacher;
        }
    }
    validate(){
        return !!this.surveyMetaData.teacher && !!this.surveyMetaData.course;
               
    }
    openModal = false;
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
                        this.surveyMetaData.evaluation = res.get('evaluation')
                        localStorage.setItem('surveyMetaData', JSON.stringify(this.surveyMetaData));
                        console.log(this.surveyMetaData);
                        this.router.navigate(['/survey'])
                    }
                    
                )
        }
    } 
    ngOnInit() {
        localStorage.removeItem('surveyMetaData');
        let activeUser: StudentModel = JSON.parse(localStorage.getItem('activeUser'));
        this.selectedDepartment = (this.deparmentsList.find(department => department["value"] == activeUser.department))["name"];
        this.getDepartmentTeacherList(activeUser.department);
     }
}