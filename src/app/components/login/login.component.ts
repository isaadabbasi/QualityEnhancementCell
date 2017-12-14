import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SIGNIN_URL } from "./../../shared/global-vars";
import { SharedService } from './../../shared/shared.service';

@Component({
    templateUrl: './login.template.html',
    styleUrls: ['./login.component.css'],
    providers: [
        SharedService
    ]
})

export class LoginComponent implements OnInit{

    users: Array<Object> = [];
    userCredentials: {rollnumber: string, password:string, email: string} = {
        rollnumber: '',
        password: '',
        email: ''
    };
    loginError: boolean = false;
    loginErrorMessage: string;
    constructor(public router: Router,
                private sharedService: SharedService){}
    ngOnInit(){
    }
    validateCredentials(){
        return this.userCredentials.rollnumber && this.userCredentials.password;
    }
    signIn(){
        if(this.userCredentials.rollnumber && this.userCredentials.password){
            if(this.userCredentials.rollnumber.indexOf('@') !== -1){
                this.userCredentials['email'] = this.userCredentials.rollnumber;
                delete this.userCredentials.rollnumber;
            }else{
                delete this.userCredentials.email;
            }         
            this.sharedService.postCall(SIGNIN_URL, this.userCredentials)
                .subscribe(res => {
                    if(res.status == 200){
                        localStorage.setItem('activeUser', (res['_body']))
                        this.router.navigate(['/dashboard']);     
                    }
                    
                }, err => {
                    console.error(err);
                    this.loginError = true;
                    this.loginErrorMessage = err.status === 401?
                        'Invalid email or password': 
                        err.status == 0?
                            "We can not reach our servers yet. Please contact the IT official.":
                            err['_body'];
                    setTimeout(()=>{
                        this.loginError = false
                        document.getElementById('login-container').classList.remove('wobble');
                    },5000)
                    setTimeout(()=>{
                        document.getElementById('login-container').classList.add('wobble');
                        this.userCredentials.rollnumber = '';
                        this.userCredentials.password = ''; 
                    },100)
                    
                })
        }
    }   
}