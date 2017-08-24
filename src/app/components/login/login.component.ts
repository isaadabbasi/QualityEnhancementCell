import {Component, OnInit} from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Router } from '@angular/router'

@Component({
    templateUrl: './login.template.html',
    styleUrls:['./login.component.css']
})

export class LoginComponent implements OnInit{

    users: Array<Object> = [];
    userCredentials: {username: string, password:string} = {
        username: '',
        password: ''
    };
    loginError: boolean = false;
    constructor(public router: Router){}
    ngOnInit(){
        this.users = JSON.parse(localStorage.getItem('users'));
    }

    signIn(){
        if(this.userCredentials.username && this.userCredentials.password){
            console.log('Got Credentials')
            this.users.forEach(user => {
                if(user['username'] === this.userCredentials.username 
                    && user['password'] === this.userCredentials.password)
                        this.router.navigate(['/dashboard'])
                else {
                    this.loginError = true
                    setTimeout(()=>{
                        this.loginError = false
                        let container = document.getElementById('login-container');
                        container.classList.remove('wobble');
                    },3000)
                    setTimeout(()=>{
                        document.getElementById('login-container').classList.add('wobble');
                        this.userCredentials.username = '';
                        this.userCredentials.password = ''; 
                    },100)
                } 
                    

            });
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