import { SIGNUP_URL } from './../../shared/global-vars';
import { StudentModel } from './../../shared/models';
import { Router } from '@angular/router';
import { SharedService } from './../../shared/shared.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
    templateUrl: './signup.template.html',
    styleUrls: ['./signup.component.css'],
    providers: [
        SharedService
    ]
})

export class SignupComponent implements OnInit{
    signupErrorMessage: any;
    signupError: boolean;
    departments: Array<Object> = [
        {value: '0', name: 'Please Select'},
        {value: 'AP', name: 'Architecture and Planning'},
        {value: 'CH', name: 'Chemical Engineering'},
        {value: 'CS', name: 'Computer Systems Engineering'},
        {value: 'ES', name: 'Electronics Engineering'},
        {value: 'EE', name: 'Energy and Environment Engineering'},
        {value: 'IM', name: 'Industrial Engineering and Management'},
        {value: 'MM', name: 'Metallurgy and Materials Engineering'}, 
        {value: 'PG', name: 'Petroleum and Gas Engineering'}, 
        {value: 'TE', name: 'Telecommunication Engineering'}
    ];
    selectedDepartment = this.departments[0];    
    userCredentials: StudentModel = {
        fullname: '',
        department: '',
        rollnumber: '',
        password: ''
    }
    constructor(public router: Router,
                private sharedService: SharedService){}
    ngOnInit(){
        console.log(this.userCredentials);
        console.log(this.departments);
    }
    loging(deptIdx){
        this.userCredentials.department = this.departments[deptIdx]["value"];
        console.log(this.userCredentials);
    }
    validateCredentials(){
        return this.userCredentials.fullname && this.userCredentials.department != "0"
            && this.userCredentials.rollnumber && this.userCredentials.password;
    }
    @ViewChild('#signup-container') signUpContainer;
    SignUp(){
        if(this.validateCredentials){
            this.sharedService.postCall(SIGNUP_URL, this.userCredentials)
                .subscribe(res => {
                    if(res.status == 200) {
                        this.router.navigate(['']);
                    }
                }, err => {
                    this.signupError = true;
                    this.signupErrorMessage = err['_body'];
                    setTimeout(()=>{
                        this.signupError = false;
                        this.signUpContainer.classList.remove('wobble');
                    }, 5000);
                    setTimeout(()=>{
                        this.signUpContainer.classList.add('wobble');
                    }, 100);
                })
        } 
    }
}