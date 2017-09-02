import { SIGNUP_URL } from './../../shared/global-vars';
import { SignUpModel } from './signup.model';
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
    loginErrorMessage: any;
    loginError: boolean;
    userCredentials: SignUpModel = {
        fullname: '',
        deparment: '',
        rollnumber: '',
        password: ''
    }
    constructor(public router: Router,
                private sharedService: SharedService){}
    ngOnInit(){

    }

    validateCredentials(){
        return this.userCredentials.fullname && this.userCredentials.deparment
            && this.userCredentials.rollnumber && this.userCredentials.password;
    }
    @ViewChild('#signup-container') signUpContainer;
    SignUp(){
        if(this.userCredentials.fullname && this.userCredentials.deparment
        && this.userCredentials.rollnumber && this.userCredentials.fullname){
            this.sharedService.postCall(SIGNUP_URL, this.userCredentials)
                .subscribe(res => {
                    if(res.status == 200) {
                        this.router.navigate(['']);
                    }
                }, err => {
                    this.loginError = true;
                    this.loginErrorMessage = err['_body'];
                    setTimeout(()=>{
                        this.loginError = false;
                        this.signUpContainer.classList.remove('wobble');
                    }, 5000);
                    setTimeout(()=>{
                        this.signUpContainer.classList.add('wobble');
                    }, 100);
                })
        } 
    }
}