import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
@Injectable()
export class SharedService{
    constructor(private http: Http){

    }
    
    getCall(url: string, options?){
        return this.http.get(url, options)
            .map(response => response.json());
    }

    postCall(url: string, body: any, options?){
        
        return this.http.post(url, body, options)
            // .map(response => response.json());
    }

    isLoggedIn(){
        // console.log('localstorage.getItem: ', localStorage.getItem('activeUser'))
        // const activeUser:any = localStorage.getItem('activeUser');
        // return activeUser ? 
        //     activeUser.rollnumber
        //     :
        //     false
        return !!(JSON.parse(localStorage.getItem('activeUser')).rollnumber);
    }



}