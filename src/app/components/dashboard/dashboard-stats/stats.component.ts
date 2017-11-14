import { Observable } from 'rxjs/Observable';
import { OnInit } from '@angular/core';
import { SURVEY_LIST, TEACHER_BASE_URL, TEACHER_DETAILS_URL, Departments, TEACHER_DETAILS_BY_DEPARTMENT } from './../../../shared/global-vars';
import { SharedService } from './../../../shared/shared.service';
import { Component, ViewChild } from '@angular/core';
// import * as _ from "lodash";
import { map, each } from "lodash";
//4.76MB
//map, each
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
  showDetails: boolean = false;
  optimize: boolean = false;
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
    
    let selectedTeacher: any= {};
    let singleSurveys = [];
    // console.time()
    let start = Date.now()
    if(teacherName !== '0'){
      this.loaderState(true);
      selectedTeacher = (this.teachersList.filter(teacher => teacher["fullname"] === teacherName))[0];
      this.surveysArray = selectedTeacher.surveys;
      
      // Should be used to avoid overhead.
      this.surveyReferencesList = map(this.surveysArray, '_reference').slice(5, 10);
      console.log(this.surveyReferencesList);
      
      let take5 = this.sharedService.postCall(SURVEY_LIST, {list: this.surveyReferencesList, optimize: this.optimize})
        .subscribe(     
          result => {
            if(result.status == 200){
              let res = JSON.parse(result["_body"]).reverse(),
                {length} = res;
            
              if(length > 5)
                res = res.slice(length-5, length);

            this.finalSurveysArray = res;
            }
          },
          err => {console.log(err); setTimeout(this.loaderState(false), 2500)},
          () => {
            // console.log(this.finalSurveysArray)
            let series = [],
                index = 1,
                categories = null;
            each(this.finalSurveysArray, surveys => {
              // console.log(surveys);
              let value = surveys.survey
              .filter(v => typeof v.value === 'number')
              .map( v => v.value);

              categories = surveys.survey
                .filter(v => typeof v.id === 'number')
                .map(v=> `Q${v.id}`);
              // _.map(surveys["survey"], survey => {value.push(survey["value"])})
              // value = value.sl ice(0, length-1);
              // console.log(value);
              series.push({
                "name": 'Survey No.' + index,
                "data": value,
                "allowPointSelect": true
              });
              index += 1;
              
              // firstSurvey.push(_.map(surveys["survey"], survey => value.push(survey["value"])))
            });
            this.options = {
              
              title: { text: this.finalSurveysArray[0].teacher },
              chart: {
                type: 'spline',
                width: 600
              },
              xAxis: [{
                categories: categories,
                crosshair: true
            }],
              series: series,
            }
            // console.log(firstSurvey);
            // console.log(this.options);
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