import { Router } from '@angular/router';
import { TEACHER_DETAILS_URL, Departments } from './../../../shared/global-vars';
import { SharedService } from './../../../shared/shared.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { StudentModel } from "./../../../shared/models";
import { TeacherModel } from "./../../../shared/models";

@Component({
    templateUrl: './start.template.html',
    styleUrls:[ '../../login/login.component.css' ]
})
export class StartSurveyComponent implements OnInit {
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
                private router: Router) { 
        this.year = new Date().getFullYear();
        this.month = this.months[new Date().getMonth()];
        
    }

    getDepartmentTeacherList(department){
        this.sharedService.getCall(`${TEACHER_DETAILS_URL}?department=${department}`)
            .subscribe( res => {
                if(res["status"] == 200) {
                    this.teachersList = res["body"];
                    this.teachers = false;
                }
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
        return !!this.surveyMetaData.course && 
               !!this.surveyMetaData.teacher;
    }
    openModal = false;
    startSession(){
        if(this.validate()){
            localStorage.setItem('surveyMetaData', JSON.stringify(this.surveyMetaData));
        }
        this.openModal = true;
    } 
    ngOnInit() {
        localStorage.removeItem('surveyMetaData');
        let activeUser: StudentModel = JSON.parse(localStorage.getItem('activeUser'));
        this.selectedDepartment = (this.deparmentsList.find(department => department["value"] == activeUser.department))["name"];
        this.getDepartmentTeacherList(activeUser.department);
     }
}