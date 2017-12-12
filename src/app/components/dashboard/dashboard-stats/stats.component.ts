import { Component, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { OnInit } from '@angular/core';
import { map, each } from "lodash";
import { Subscription } from 'rxjs/Subscription';

import { SURVEY_LIST, 
         Departments, 
         TEACHER_DETAILS_BY_DEPARTMENT, 
         BASE_URL,
         DOWNLOAD_EXCEL, 
         GET_SURVEY} from './../../../shared/global-vars';
import { AutoUnsubscribe } from "./../../../decorators/AutoUnsubscribe";         
import { SharedService } from './../../../shared/shared.service';
import { ModalComponent } from '../../../modal/modal.component';

@Component({
    selector: 'stats',
    templateUrl: './stats.template.html',
    styleUrls: ['./stats.css']
})
@AutoUnsubscribe()
export class StatsComponent implements OnInit{
  @ViewChild('modal', {read: ViewContainerRef}) container: ViewContainerRef;
  
  surveyDetails:    Map<string, any> = new Map();
  
  timeToFetch:      number;
  
  SurveyId:         any;
  teachersList:     any;
  
  deparmentsList:   Array<Object> =  Departments;
  
  sub:              Subscription;
  
  showLoader:       boolean = false;
  showTeachersList: boolean = false;
  showDetails:      boolean = false;
  optimize:         boolean = true;
  singleSurvey:     boolean = false;
  
  options:          Object;
  // events
  public chartClicked(e:any):void {
    this.showDetails = true;    
  }

  public chartHovered(e:any):void {
    console.log(e);
    
  }
  
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
    console.log(this.optimize);
    
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
            this.teachersList = res;
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
    console.log(optimize);
    
    this.surveyDetails.set('teacher', teacherName);
    let start = Date.now(),
        finalSurveysArray: Array<any> = [];
    
    if(!!surveyId){
      this.singleSurvey = true;
      this.sharedService.getCall(`${SURVEY_LIST}/id/${surveyId}`)
        .subscribe(
          res => {
            finalSurveysArray.push(res);
          }, console.error,
          () => {
            this.options = plotGraph(finalSurveysArray);
          }
        )
    }
    if(teacherName !== '0'){
      this.singleSurvey = false;
      this.loaderState(true);
      
      let 
        {surveys} = (this.teachersList.filter(teacher => teacher["fullname"] === teacherName))[0],
        surveyReferencesList = map(surveys, '_reference')
      console.log(this.optimize);
      
      this.sharedService.postCall(SURVEY_LIST, {list: surveyReferencesList, optimize: this.optimize})
        .map(res => res.json().reverse())
        .subscribe(     
          result => {
            console.log(result)
            let 
                {length} = result;

            finalSurveysArray = length > 5 ? 
              result.slice(length-5, length):
              result;
          },
          err => {console.error(err); setTimeout(this.loaderState(false), 2500)},
          () => {
            this.options = plotGraph(finalSurveysArray);
            setTimeout(this.loaderState(false), 2500);
        });
    }
    let end = Date.now();
    this.timeToFetch = end - start;

    let plotGraph = (surveyArray, type?: string):Object => {
      let series = [],
      index = 1,
      categories = null,
      questions = null,
      options = {};
      each(surveyArray, surveys => {
        let value = surveys.survey
        .filter(v => typeof v.value === 'number')
        .map( v => v.value);

        categories = surveys.survey
          .filter(v => typeof v.id === 'number')
          .map(v=> `Q${v.id}`);
        questions = surveys.survey
          .filter(v => typeof v.id === 'number')
          .map(v => v.question);
        console.log(value, questions)
        series.push({
          "name": 'Survey No.' + index,
          "data": value,
          "allowPointSelect": true
        });
        index += 1;
      });
      console.log(categories)
      return options = {
        
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
        tooltip: {
          animation: true,
          backGroundColor: "rgb(245,245,245)",
          shared: true,
          useHTML: true,
          headerFormat: "<strong>{point.key}: </strong>",
          pointFormatter: function(){
            return '<span style="color: {series.color}">{series.color}' + questions[this.series.data.indexOf( this )] + "</span><br>" + this.series.yAxis.max;
          }
        }
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