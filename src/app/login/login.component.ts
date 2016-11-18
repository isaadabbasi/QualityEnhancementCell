import {Component, OnInit} from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Router } from '@angular/router'

@Component({
    templateUrl: './login.template.html',
    styleUrls:['./login.component.css']
})

export class LoginComponent implements OnInit{

    userCredentials: {email: string, password:string} = {
        email: '',
        password: ''
    };

    constructor(public af: AngularFire, public router: Router){}
    ngOnInit(){

    }

    signIn(){
        if(this.userCredentials.email && this.userCredentials.password)
        this.af.auth.login
            ({email:this.userCredentials.email, password:this.userCredentials.password})
                .then( (res) => {
                    if(res.uid) {
                        localStorage.setItem('authid',res.uid);
                        this.router.navigate(['/dashboard'])
                        
                    }
                })
    }   
}