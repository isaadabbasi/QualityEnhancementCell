import {Component, OnInit} from '@angular/core';
import { AngularFire } from 'angularfire2';
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
    userCredentials: {rollnumber: string, password:string} = {
        rollnumber: '',
        password: ''
    };
    loginError: boolean = false;
    loginErrorMessage: string;
    constructor(public router: Router,
                private sharedService: SharedService,
                ){}
    ngOnInit(){
        // this.users = JSON.parse(localStorage.getItem('users'));
    }
    validateCredentials(){
        return this.userCredentials.rollnumber && this.userCredentials.password;
    }
    signIn(){
        if(this.userCredentials.rollnumber && this.userCredentials.password){
            console.log('Got Credentials', this.userCredentials.password, this.userCredentials.rollnumber);            
            this.sharedService.postCall(SIGNIN_URL, this.userCredentials)
                .subscribe(res => {
                    console.log(res);
                    
                    if(res.status == 200){
                        console.log(res);
                        localStorage.setItem('activeUser', (res['_body']))
                        console.log(JSON.parse(localStorage.getItem('activeUser')).rollnumber);
                        this.router.navigate(['/dashboard']);     
                    }
                    
                }, err => {
                    console.log(err);
                    this.loginError = true;
                    this.loginErrorMessage = err['_body'];
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
            // this.users.forEach(user => {
            //     if(user['username'] === this.userCredentials.username 
            //         && user['password'] === this.userCredentials.password)
            //             this.router.navigate(['/dashboard'])
            //     else {
            //         this.loginError = true
            //         setTimeout(()=>{
            //             this.loginError = false
            //             document.getElementById('login-container').classList.remove('wobble');
            //         },3000)
            //         setTimeout(()=>{
            //             document.getElementById('login-container').classList.add('wobble');
            //             this.userCredentials.username = '';
            //             this.userCredentials.password = ''; 
            //         },100)
            //     } 
                    

            // });
            // this.router.navigate(['/dashboard'])
        }
        // this.af.auth.login
        //     ({email:this.userCredentials.email, password:this.userCredentials.password})
        //         .then( (res) => {
        //             if(res.uid) {
        //                 localStorage.setItem('authid',res.uid);
        //                 this.router.navigate(['/dashboard'])
                        
        //             }
        //         })
    }   
}