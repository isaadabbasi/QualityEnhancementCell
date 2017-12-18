import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import 'rxjs/add/operator/map'

import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class SharedService{
    data   = new BehaviorSubject({});
    currentMessage  = this.data.asObservable();

    constructor(
        private http: Http){
    }
    
    getCall(url: string, options?){
        
        return this.http.get(url, options)
            .map(response => response.json());
    }

    postCall(url: string, body: any, options?){
        return this.http.post(url, body, options)
            // .map(response => response.json())
    }

    deleteCall(url: string, option?){
        return this.http.delete(url, option)
    }

    putCall(url: string, body: any, option?){
        return this.http.put(url, body, option)
    }

    isLoggedIn(){
        let activeUser = (JSON.parse(localStorage.getItem('activeUser')));
        if(activeUser && (activeUser.rollnumber || activeUser.department || activeUser.email)){
            return !!activeUser["rollnumber"] || !!activeUser["email"] ;
        }
        else return false;
    }

    sendSurvey(survey: any){
        this.data.next(survey);
    }
}