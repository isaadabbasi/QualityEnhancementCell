import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { each } from 'lodash';

import { GET_SURVEY, SURVEY_LIST, DOWNLOAD_EXCEL } from './../../../shared/global-vars';
import { SharedService } from './../../../shared/shared.service';
import { AutoUnsubscribe } from '../../../decorators/AutoUnsubscribe';
@Component({
    selector: 'dashboard-survey',
    templateUrl: './dashboard-survey.template.html',
    styleUrls: [`./dashboard-survey.css`]
})
@AutoUnsubscribe()
export class DashboardSurveyComponent implements OnInit{

    @Input('optimizedSurvey')
        optimizedSurvey : Object | boolean;


    date                : any;
    survey              : any;
    subject             : any;
    questions           : any;
    surveyResult        : any;
    evaluationType      : any;
    selectedTeacher     : any;

    surveyId            : string;
    selectedDepartment  : string;
    optimize            : boolean;

    sub                 : Subscription;
    
    surveyDetails       : Map<string, any> = new Map();
    
    surveyResultId;

    constructor(private _router: Router,
                private sharedService: SharedService) {
        
    }
    ngOnInit(){
        this.getSurvey();
    }
    getSurvey(){
        this.sharedService.currentMessage
        .subscribe(
            result => {
                this.optimize = result["optimize"];
                if(Object.keys(result).length){
                    this.surveyResult       = result["survey"];
                    this.selectedDepartment = this.surveyResult["dept"]
                    this.selectedTeacher    = this.surveyResult["teacher"]
                    this.subject            = this.surveyResult["course"];
                    this.evaluationType     = this.surveyResult["evaluation"];
                    this.date               = this.surveyResult["created"];
                    // this.surveyDetails.get('surveyId', this.surveyResult["_id"])
                    this.survey = this.surveyResult["survey"];

                }
            },
            console.error
        )
    }
    getForm(type: string){
        this.sharedService.getCall(GET_SURVEY + type)
            .subscribe(
                result => this.questions = result["sections"],
                err => console.error(err)
            );
    }
    downloadCSV(){
        window.open(`${DOWNLOAD_EXCEL}/${this.surveyResult["_id"]}`, '__blank');        
    }
    openSurveyChart(survey){
        let optimize = this.optimize;
        this.sharedService.sendSurvey({survey, optimize});
        this._router.navigate(['/dashboard/stats', 'single']);

    }
}