import { TeacherEvaluationForm } from './../../../shared/forms/teacher-evaluation-form';
import { SURVEY_URL } from './../../../shared/global-vars';
import { SharedService } from './../../../shared/shared.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'dashboard-survey',
    templateUrl: './dashboard-survey.template.html'
})
export class DashboardSurveyComponent implements OnInit, OnDestroy{
    sub;
    id;
    questions;
    response;
    questionResponseSet;
    constructor(private route: ActivatedRoute,
                private sharedService: SharedService) {
        
    }
    ngOnInit(){
        this.sub = this.route.params.subscribe( params => {
            this.id = params['id'];
            this.sharedService.getCall(`${SURVEY_URL}${this.id}`)
                .subscribe( res => {
                   console.log(res);
                   this.response = res;
                   let worker = new Worker('./app/worker.js');
                   console.log(worker);
                   if(res['evaluation'] === 'teacher'){
                        this.questions = TeacherEvaluationForm;
                        console.log(this.questions);
                   }
                }, err => console.log(err));

        });
    }
    
    mapResults(results: Array<Object>){

        results.forEach( (e:Object) => {
            
        })
    }
    ngOnDestroy(){
        this.sub.unsubscribe();
    }
}