import { Component, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { OnInit } from '@angular/core';
import { map, each } from "lodash";
import { Subscription } from 'rxjs/Subscription';

import { SURVEY_LIST, 
         Departments, 
         TEACHER_DETAILS_BY_DEPARTMENT, 
         BASE_URL,
         DOWNLOAD_EXCEL } from './../../../shared/global-vars';
import { SharedService } from './../../../shared/shared.service';
import { ModalComponent } from '../../../modal/modal.component';

@Component({
    selector: 'stats',
    templateUrl: './stats.template.html',
    styleUrls: ['./stats.css']
})
export class StatsComponent implements OnInit{
  @ViewChild('modal', {read: ViewContainerRef}) container: ViewContainerRef;
  
  surveyDetails: Map<string, any> = new Map();
  finalSurveysArray: Array<any> = [];
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
  sub: Subscription;
  singleSurvey: boolean = false;
    // lineChart
  
  
  // events
  public chartClicked(e:any):void {
    this.showDetails = true;    
  }

  public chartHovered(e:any):void {
  }
  options: Object;
  ngOnInit(){
    this.sub = this.route.paramMap
    .subscribe(
        params => {
            this.SurveyId = params.get("id");
            this.showSurvey('0', false, this.SurveyId);
        }),
    err => console.error(err)
  }
  constructor(private route: ActivatedRoute,
              private sharedService: SharedService,
              private _cfr: ComponentFactoryResolver
            ){                
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
      this.surveyDetails.set('dept', value);
      this.showTeachersList = true;
      console.info(URL);
      this.sharedService.getCall(URL)
        .subscribe(
          res => {
            this.showTeachersList = true;
            this.teachersList = res["body"];
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
  showSurvey(teacherName: string, optimize?: boolean, surveyId?: string){
    this.surveyDetails.set('teacher', teacherName);
    let selectedTeacher: any= {},
        singleSurveys = [],
        start = Date.now();
    
    if(!!surveyId){
      this.singleSurvey = true;
      this.sharedService.getCall(`${SURVEY_LIST}/id/${surveyId}`)
        .subscribe(
          res => {
            this.finalSurveysArray.push(res);
          }, console.error,
          () => {
            plotGraph(this.finalSurveysArray);
          }
        )
    }
    if(teacherName !== '0'){
      this.singleSurvey = false;
      this.loaderState(true);
      selectedTeacher = (this.teachersList.filter(teacher => teacher["fullname"] === teacherName))[0];
      this.surveysArray = selectedTeacher.surveys;
      console.info(selectedTeacher)
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
            plotGraph(this.finalSurveysArray);
            setTimeout(this.loaderState(false), 2500);
        }
      );
      
      
      
    }
    let end = Date.now();
    this.timeToFetch = end - start;

    let plotGraph = (surveyArray, type?: string) => {
      let series = [],
      index = 1,
      categories = null;
      each(surveyArray, surveys => {
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
        
        title: { text: surveyArray[0].teacher },
        chart: {
          type: type || 'spline',
          width: 600,
          height: 350
        },
        xAxis: [{
          categories: categories,
          crosshair: true
      }],
        series: series,
      }
    }
  }
  loaderState(hidden: boolean){
    this.showLoader = hidden;
  }
  downloadCSV(){
    window.open(`${BASE_URL}/excel/${this.SurveyId}`, '__blank');
  }
}