import { Observable } from 'rxjs/Observable';
import { OnInit } from '@angular/core';
import { SURVEY_LIST, TEACHER_BASE_URL, TEACHER_DETAILS_URL, Departments, TEACHER_DETAILS_BY_DEPARTMENT } from './../../../shared/global-vars';
import { SharedService } from './../../../shared/shared.service';
import { Component, ViewChild } from '@angular/core';
import * as _ from "lodash";

@Component({
    selector: 'stats',
    templateUrl: './stats.template.html',
    styleUrls: ['./stats.css']
})
export class StatsComponent implements OnInit{
  surveyOnly: any;
  finalSurveysArray: any;
  surveyReferencesList: {}[];
  teacherSurvey: {}[];
  showLoader: boolean;
  timeToFetch: number;
  length: any;
  surveysArray: any;
  SurveyId: any;
  teachersList: any;
  showTeachersList: boolean;
  deparmentsList = Departments;
  showDetails: Boolean = false;
    // lineChart
  
  
  // events
  public chartClicked(e:any):void {
    this.showDetails = true;
    console.log(e);
    
  }

  public chartHovered(e:any):void {
    console.log(e);
  }
  options: Object;
  ngOnInit(){
    this.sharedService.getCall(TEACHER_DETAILS_URL)
      .subscribe( next => {
        console.log(next["body"]);
      })
  }
  constructor(private sharedService: SharedService){
  
  }
  getNextList(entity: string, value: string){
    let URL = entity === 'teachers' && value != "0"? 
      TEACHER_DETAILS_BY_DEPARTMENT + value 
      :
      '';
    if(value != "0"){
      this.showTeachersList = true;
      console.log(URL, value, this.showTeachersList);
      this.sharedService.getCall(URL)
        .subscribe(
          next => {
            this.showTeachersList = true;
            console.log(next)
            this.teachersList = next["body"];
          },
          err => console.log(err),
          () => console.log('complete')
        )
      }else{
        this.showTeachersList = false;
      }
    }
      
  viewSurvey(id){
    this.SurveyId.emit(id);  
  }
  showSurvey(teacherName: string){
    
    let selectedTeacher: Object = {};
    let singleSurveys = [];
    // console.time()
    let start = Date.now()
    if(teacherName !== '0'){
      this.loaderState(true);
      selectedTeacher = (this.teachersList.filter(teacher => teacher["fullname"] === teacherName))[0];
      this.surveysArray = selectedTeacher["surveys"];
      
      // Should be used to avoid overhead.
      this.surveyReferencesList = _.map(this.surveysArray, '_reference').slice(5, 10);
      console.log(this.surveyReferencesList);
      
      let take5 = this.sharedService.postCall(SURVEY_LIST, {list: this.surveyReferencesList})
        .take(5);
      take5
        .subscribe(     
          result => {
            if(result.status == 200)
              console.log(result["surveys"], result);this.finalSurveysArray = JSON.parse(result["_body"]).reverse();
          },
          err => {console.log(err); setTimeout(this.loaderState(false), 2500)},
          () => {
            console.log(this.finalSurveysArray)
            let firstSurvey = [];
            let index = 1;
            _.each(this.finalSurveysArray, surveys => {
              console.log(surveys);
              let value = [];
              _.map(surveys["survey"], survey => {value.push(survey["value"])})
              value = value.slice(0, length-1);
              firstSurvey.push({
                "name": 'Survey No.' + index,
                "data": value,
                "allowPointSelect": true
              });
              index += 1;
              
              // firstSurvey.push(_.map(surveys["survey"], survey => value.push(survey["value"])))
            });
            this.options = {
              
              title: { text: this.finalSurveysArray[0].teacher},
              chart: {
                type: 'spline'
              },
              
              xAxis: [{
                categories: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7', 'Q8', 'Q9', 
                'Q10', 'Q11', 'Q12', 'Q13','Q14', 'Q15', 'Q16','Q17', 'Q18'],
                crosshair: true
            }],
              series: firstSurvey,
            }
            console.log(firstSurvey);
            console.log(this.options);
            setTimeout(this.loaderState(false), 2500)

          
        }
      );
      
      
      
    }
    let end = Date.now();
    this.timeToFetch = end - start;
    console.log(this.timeToFetch, 'ms');
  }
  loaderState(hidden: boolean){
    this.showLoader = hidden;
  }
}