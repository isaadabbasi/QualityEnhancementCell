import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { each } from 'lodash';

import { BASE_URL, GET_SURVEY, SURVEY_LIST, DOWNLOAD_EXCEL } from './../../../shared/global-vars';
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
    
    sub                 : Subscription;
    surveyResultId;

    constructor(private route: ActivatedRoute,
                private sharedService: SharedService) {
        
    }
    ngOnInit(){
        this.getSurvey();
    }
    getSurvey(){
        this.sharedService.currentMessage
        .subscribe(
            result => {
                if(Object.keys(result).length){
                    this.surveyResult       = result;
                    this.selectedDepartment = this.surveyResult["dept"]
                    this.selectedTeacher    = this.surveyResult["teacher"]
                    this.subject            = this.surveyResult["course"];
                    this.evaluationType     = this.surveyResult["evaluation"];
                    this.date               = this.surveyResult["created"];
                        
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
        window.open(`${DOWNLOAD_EXCEL}/${this.surveyId}`, '__blank');        
    }
}