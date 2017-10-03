import { SURVEY_LIST } from './../../../shared/global-vars';
import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { SharedService } from "./../../../shared/shared.service";
@Component({
    selector: 'surveys',
    templateUrl: './surveys.template.html',
    providers: [
      SharedService
    ]
})
export class SurveysComponent {
  @Output('surveyId') SurveyId: EventEmitter<number> = new EventEmitter<number>();
  surveysArray = [
    // {
    //   _id : 1,
    //   evaluation: "teacher",
    //   target: "Shamim Naich",
    //   survey: [{

    //   }],
    //   created: (new Date()).toLocaleDateString()
    // },
    // {
    //   _id : 1,
    //   evaluation: "teacher",
    //   target: "ABC",
    //   survey: [{
        
    //   }],
    //   created: (new Date()).toLocaleDateString()
    // },
    // {
    //   _id : 1,
    //   evaluation: "teacher",
    //   target: "DEF",
    //   survey: [{
        
    //   }],
    //   created: (new Date()).toLocaleDateString()
    // }
  ];

  constructor(private sharedService: SharedService){
    this.sharedService.getCall(SURVEY_LIST)
      .subscribe(
        next => { this.surveysArray = next; console.log(next); },
        err => console.log(err)        
      ), err => console.log(err)
  }

  viewSurvey(id){
    this.SurveyId.emit(id);  
  }
}