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
      next => { 
        // console.log(this.surveysArray.filter(sur => sur["evalutaion"] == "teacher"));
        this.surveysArray = next; console.log(next); 
      },
      err => console.log(err),
      () => {
        console.log(_.filter(this.surveysArray, survey => {
          return survey["evalutaion"] === "teacher"
        }));
        let surveyByDate: Array<Object> = [];
        _.each(this.surveysArray, survey => {
          let index = _.findIndex(surveyByDate, obj => {
            return obj["course"] === survey.course
                && obj["teacher"] === survey.teacher
                && obj["evaluation"] === survey["evaluation"]
                && obj["created"].slice(0, 10) === survey["created"].slice(0, 10)
          });
          if(index == -1 ){
            _.forEach(survey["survey"], survey => {
              survey["count" + 1] = 1;
            })
            surveyByDate.push(survey);
            console.log(surveyByDate);
          }else{
            
          }
        })
        let surveyByName = [];
        _.each(this.surveysArray,(survey) => {
          // console.log(survey);
          
          if(_.findIndex(surveyByName, (obj) => {
            return survey.target === obj.target && survey.evaluation === obj.evaluation;
          }) !== -1){
            console.log(true);

          }else{
            console.log(false);
            surveyByName.push(survey);
            console.log(surveyByName);  
          }
        });
        
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