import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import 'rxjs/add/operator/map'


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
            // .map(response => response.json())
    }

    deleteCall(url: string, option?){
        return this.http.delete(url, option)
    }

    isLoggedIn(){
        let activeUser = (JSON.parse(localStorage.getItem('activeUser')));
        if(activeUser && (activeUser.rollnumber || activeUser.department || activeUser.email)){
            return !!activeUser["rollnumber"] || !!activeUser["email"] ;
        }
        else return false;
    }

}