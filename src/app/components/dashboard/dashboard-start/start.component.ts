import { Component, OnInit, ViewChild } from '@angular/core';
import * as localforage from 'localforage';
@Component({
    templateUrl: './start.template.html',
    styleUrls:[ '../../login/login.component.css' ]
})
export class StartSurveyComponent implements OnInit {
    year: number;
    month: String;
    teachers: boolean;
    selectedDepartment: string = '';
    selectedTeacher: string = '';
    subjects: Array<string> = null;
    @ViewChild('dept') deptReference;  
    months:Array<String> = ["January", "February", "March", "April", "May", "June","July","August", "September", "October", "November", "December"];
    constructor() { 
        this.year = new Date().getFullYear();
        this.month = this.months[new Date().getMonth()];
    }

    getDepartmentTeacherList(department){
        if(department !== 'null' || department || department !== null){
            this.selectedDepartment = department;
            this.teachers = true;
        }
    }
    getSubjectList(selectedTeacher){ // need to rewrite with real logic, bluffing DOM for now.
        this.selectedTeacher = selectedTeacher;
        this.subjects = ['1','2','3']; 
    }
    startSession(){
        // console.log(this.department);
    }

    ngOnInit() {
        localforage.getItem('activeUser')
            .then(user=>{
                this.selectedDepartment = user['department'];
                console.log(this.selectedDepartment)
                console.log(this.deptReference)
                let node = this.deptReference.nativeElement;
                node.value = this.selectedDepartment;
                
            })
     }
}