import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SIGNIN_URL } from "./../../shared/global-vars";
import { SharedService } from './../../shared/shared.service';
import { UserCredentialsModel } from '../../shared/models';

@Component({
    templateUrl: './login.template.html',
    styleUrls: ['./login.component.css'],
    providers: [
        SharedService
    ]
})

export class LoginComponent implements OnInit{

    userCredentials:    UserCredentialsModel    = { rollnumber: '', password: '', email: '' }
    users:              Array<Object>           = [];
    loginError:         boolean                 = false;
    loginErrorMessage:  string                  = '';
    
    constructor(public router: Router,
                private sharedService: SharedService){}
    ngOnInit(){
        this.users = JSON.parse(localStorage.getItem('users'));
    }
    validateCredentials(){
        return this.userCredentials.rollnumber 
            && this.userCredentials.password;
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
                    if(res.status === 200){
                        localStorage.setItem('activeUser', res["_body"])
                        this.router.navigate(['/dashboard']);     
                    }
                    
                    
                }, err => {
                    console.error(err);
                    let loginContainer: HTMLElement = document.getElementById('login-container');
                    this.loginError = true;
                    this.loginErrorMessage = err.status === 401?
                        'Invalid email or password': 
                        err.status == 0?
                            "We can not reach our servers yet. Please contact the IT official.":
                            err['_body'];
                    setTimeout(()=>loginContainer.classList.add('wobble'), 100);
                    setTimeout(()=>{
                        this.loginError = false
                        loginContainer.classList.remove('wobble');
                    }, 5000 );
                })
        }
    }   
}