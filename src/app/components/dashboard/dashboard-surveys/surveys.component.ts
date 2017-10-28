import { SURVEY_LIST } from './../../../shared/global-vars';
import { Component, ViewChild, Output, EventEmitter, OnInit } from '@angular/core';
import { SharedService } from "./../../../shared/shared.service";
import * as _ from "lodash";
@Component({
    selector: 'surveys',
    templateUrl: './surveys.template.html',
    styleUrls: [
      `./surveys.component.css`
    ],
    providers: [
      SharedService
    ]
})
export class SurveysComponent implements OnInit {
  @Output('surveyId') SurveyId: EventEmitter<number> = new EventEmitter<number>();
  surveysArray;
  ngOnInit(){
    this.sharedService.getCall(SURVEY_LIST)
    .subscribe(
      next => { this.surveysArray = next; console.log(next); },
      err => console.log(err),
      () => {
        let surveyByName = [];
        _.each(this.surveysArray,(survey) => {
          // console.log(survey);
          
          if(_.findIndex(surveyByName, (obj) => {
            return survey.target === obj.target && survey.evaluation === obj.evaluation;
          }) !== -1){
            console.log(true);

          }else{
            console.log(false);
            surveyByName.push({
              
            });
            console.log(surveyByName);
            
          }
        });
        // let byTeacherName = _.groupBy(this.surveysArray, item => {
        //   return item.target;
        // });
        // console.log(byTeacherName);
        // let b =[];
        // let i = 0; 
        // _.each(this.surveysArray, item => {
        //   b[i] = b[item.target] || [];
        //   b[i].push(item);
        // });
        // console.log(b);
        
        // // this.surveysArray = a;
        // console.log(a);
      }
    );
  }
  constructor(private sharedService: SharedService){
    
      console.log(_.chunk(['a', 'b', 'c', 'd'], 2));
      
  }

  viewSurvey(id){
    this.SurveyId.emit(id);  
  }
}