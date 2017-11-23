import { Observable } from 'rxjs/Observable';
import { OnInit } from '@angular/core';
import { SURVEY_LIST, TEACHER_BASE_URL, TEACHER_DETAILS_URL, Departments, TEACHER_DETAILS_BY_DEPARTMENT } from './../../../shared/global-vars';
import { SharedService } from './../../../shared/shared.service';
import { Component, ViewChild } from '@angular/core';
import { map, each } from "lodash";
@Component({
    selector: 'stats',
    templateUrl: './stats.template.html',
    styleUrls: ['./stats.css']
})
export class StatsComponent implements OnInit{
  finalSurveysArray: any;
  surveyReferencesList: {}[];
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
  }

  public chartHovered(e:any):void {
  }
  options: Object;
  ngOnInit(){
    
  }
  constructor(private sharedService: SharedService){
  
  }
  onOptimize(teacher){
    this.showSurvey(teacher, this.optimize);
  }
  getNextList(entity: string, value: string){
    let URL = entity === 'teachers' && value != "0"? 
      TEACHER_DETAILS_BY_DEPARTMENT + value 
      :
      '';
    if(value != "0"){
      this.showTeachersList = true;
      this.sharedService.getCall(URL)
        .subscribe(
          next => {
            this.showTeachersList = true;
            this.teachersList = next["body"];
          },
          err => console.error(err)
        )
      }else{
        this.showTeachersList = false;
      }
    }
      
  viewSurvey(id){
    this.SurveyId.emit(id);  
  }
  showSurvey(teacherName: string, optimize?: boolean){
    let selectedTeacher: any= {},
        singleSurveys = [],
        start = Date.now();

    if(teacherName !== '0'){
      this.loaderState(true);
      selectedTeacher = (this.teachersList.filter(teacher => teacher["fullname"] === teacherName))[0];
      this.surveysArray = selectedTeacher.surveys;
      
      // Should be used to avoid overhead.
      this.surveyReferencesList = map(this.surveysArray, '_reference').slice(5, 10);
      
      this.sharedService.postCall(SURVEY_LIST, {list: this.surveyReferencesList, optimize: this.optimize})
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
          err => {console.error(err); setTimeout(this.loaderState(false), 2500)},
          () => {
            let series = [],
                index = 1,
                categories = null;
            each(this.finalSurveysArray, surveys => {
              let value = surveys.survey
              .filter(v => typeof v.value === 'number')
              .map( v => v.value);

              categories = surveys.survey
                .filter(v => typeof v.id === 'number')
                .map(v=> `Q${v.id}`);
              series.push({
                "name": 'Survey No.' + index,
                "data": value,
                "allowPointSelect": true
              });
              index += 1;
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
            setTimeout(this.loaderState(false), 2500)
        }
      );
      
      
      
    }
    let end = Date.now();
    this.timeToFetch = end - start;
  }
  loaderState(hidden: boolean){
    this.showLoader = hidden;
  }
}