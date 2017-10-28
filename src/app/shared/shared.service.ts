import { HttpClient } from '@angular/common/http';
import { FirebaseListObservable } from 'angularfire2';
import { Injectable } from "@angular/core";
import { Http } from "@angular/http";

@Injectable()
export class SharedService{
    
    

    constructor(
        private http: Http
        ){}
    
    getCall(url: string, options?){
        return this.http.get(url, options)
            .map(response => response.json());
    }

    postCall(url: string, body: any, options?){
        return this.http.post(url, body, options)
    }

    isLoggedIn(){
        let activeUser = (JSON.parse(localStorage.getItem('activeUser')));
        if(activeUser && (activeUser.rollnumber || activeUser.email)){
            return !!activeUser["rollnumber"] || !!activeUser["email"] ;
        }
        else return false;
    }

}