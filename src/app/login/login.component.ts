import {Component, OnInit} from '@angular/core';


@Component({
    templateUrl: './login.template.html',
    styleUrls:['./login.component.css']
})

export class LoginComponent implements OnInit{

    userCredentials: Object = {
        email: '',
        password: ''    
    };

    constructor(){}
    ngOnInit(){

    }

    signIn(){
        console.log(this.userCredentials)
    }
}