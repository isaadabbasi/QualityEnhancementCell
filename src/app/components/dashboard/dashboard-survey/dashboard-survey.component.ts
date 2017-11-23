import { Subscription } from 'rxjs';
import { BASE_URL, GET_SURVEY, SURVEY_LIST } from './../../../shared/global-vars';
import { SharedService } from './../../../shared/shared.service';
import { OnInit } from '@angular/core';
import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
    selector: 'dashboard-survey',
    templateUrl: './dashboard-survey.template.html',
    styleUrls: [`./dashboard-survey.css`]
})
export class DashboardSurveyComponent implements OnInit, OnDestroy{
    survey: any;
    surveyId: string;
    date: any;
    evaluationType: any;
    subject: any;
    selectedTeacher: any;
    questions: any;
    surveyResult: any;
    params: string;
    sub: Subscription;
    surveyResultId;
    constructor(private route: ActivatedRoute,
                private sharedService: SharedService) {
        
    }
    ngOnInit(){
        this.sub = this.route.paramMap
            .subscribe(
                params => {
                    this.surveyId = params.get("id");
                    this.getSurvey(this.surveyId);
                }),
            err => console.log(err),
            () => console.log('Hello World!');
    }
    getSurvey(id: string){
        this.surveyResultId = id;
        console.log(id);
        this.sharedService.getCall(`${SURVEY_LIST}/id/${id}`)
            .subscribe(
                result => {
                    this.surveyResult = result;
                    this.selectedTeacher = this.surveyResult["teacher"]
                    this.subject = this.surveyResult["course"];
                    this.evaluationType = this.surveyResult["evaluation"];
                    this.date = this.surveyResult["created"];
                    this.getForm(this.evaluationType);
                    this.survey = this.surveyResult["survey"]
                    // this.surveyResult = result["surveys"];
                    console.log(this.survey);
                }
            ),
            err => console.log(err),
            () => {}
    }
    getForm(type: string){
        console.log(type)
        this.sharedService.getCall(GET_SURVEY + type)
            .subscribe(
                result => this.questions = result["sections"],
                err => console.log(err),
                () => console.log('complete', this.questions)
            );
    }
    ngOnDestroy(){
        this.sub.unsubscribe(); 
    }

    downloadCSV(){
        // console.log(this.route.params.)
        window.open(`${BASE_URL}/excel/${this.surveyId}`, '__blank');
        // this.sharedService.postCall(`${BASE_URL}/users/excel`, this.questions)
        // .map(res=> res.json())
        //     .subscribe(
        //         console.log,
        //         console.error
        //     )
    }
}