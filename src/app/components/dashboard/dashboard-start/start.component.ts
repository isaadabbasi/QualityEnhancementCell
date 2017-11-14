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
        console.log(department)
        console.log(`${TEACHER_DETAILS_URL}?department=${department}`);
        this.sharedService.getCall(`${TEACHER_DETAILS_URL}?department=${department}`)
            .subscribe( res => {
                if(res.status == 200) {
                    console.log(res);
                    console.log(res["body"]);
                    
                    this.teachersList = res["body"];
                    this.teachers = false;
                    console.log(this.teachersList);
                }
            }, err => {
                console.log(err);
                this.teachersList = JSON.parse(err["_body"])["body"];
                console.log(typeof(this.teachersList), this.teachersList);
                this.teachers = true;
            });
    }
    getSubjectList(selectedTeacher){ // need to rewrite with real logic, bluffing DOM for now.
        this.subjects = !selectedTeacher ? false : true;
        this.selectedTeacher = selectedTeacher;
        this.surveyMetaData.course= selectedTeacher;
        console.log(this.surveyMetaData);
        
        console.log(this.subjects, selectedTeacher);
        // this.subjects = ['1',','3']; 
        let teacherObject = (this.teachersList).find(o => o["fullname"] === selectedTeacher) ;
        this.subjectsList = teacherObject ? teacherObject["subjects"] : undefined;
        console.log(this.subjectsList);
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
        console.log('Starting Session');
        console.log(this.validate());
        
        if(this.validate()){
            // this.surveyMetaData.target = this.selectedTeacher;
            console.log(this.surveyMetaData);
            localStorage.setItem('surveyMetaData', JSON.stringify(this.surveyMetaData));
            // this.router.navigate(['survey']);
        }
        this.openModal = true;
    } 
    ngOnInit() {
        localStorage.removeItem('surveyMetaData');
        let activeUser: StudentModel = JSON.parse(localStorage.getItem('activeUser'));
        console.log(activeUser);
        this.selectedDepartment = (this.deparmentsList.find(department => department["value"] == activeUser.department))["name"];
        console.log(this.selectedDepartment, activeUser.department);
        this.getDepartmentTeacherList(activeUser.department);
        console.log(localStorage.getItem('surveysAdded'));
     }
}