import { DeparmentsListItemModel } from './../../../shared/models';
import { Component,
         OnInit,
         ViewChild, 
         ViewContainerRef, 
         ComponentFactoryResolver } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

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

  @ViewChild('modal', {read: ViewContainerRef})
    container       : ViewContainerRef;
  
  surveyDetails     : Map<string, any> = new Map();
  
  teachersList      : any;
  
  deparmentsList    : Array<DeparmentsListItemModel> =  Departments;
  
  sub               : Subscription;
  
  optimize          : boolean = false;
  showLoader        : boolean = false;
  showDetails       : boolean = false;
  singleSurvey      : boolean = false;
  showTeachersList  : boolean = false;
  
  options           : Object;
  
  ngOnInit(){

    this.route.params
      .subscribe(param => {
        if(param.id === 'single') this.viewSingleSurvey()
      });
  }

  constructor(private _router       : Router,
              private sharedService : SharedService,
              private route         : ActivatedRoute,
              private _cfr          : ComponentFactoryResolver
            ){ }
  
  viewSingleSurvey(){
    let 
    start = Date.now(),
    finalSurveysArray: Array<any> = [];

    this.sharedService.currentMessage
      .subscribe(
        next => {
          this.optimize = next["optimize"];
          if(!!next["survey"]){
            finalSurveysArray.push(next["survey"]);
            this.options = this.plotGraph(finalSurveysArray);
            let end = Date.now();

            this.surveyDetails.set('surveyId', next["survey"]["_id"])
            this.surveyDetails.set('timeToFetch', end - start);
            this.surveyDetails.set('survey', next["survey"]);
            this.singleSurvey = true;
          }
        }, console.error,
      );
  }
  getNextList(entity: string, value: string){

    let URL = entity === 'teachers' && value != "0"? 
      TEACHER_DETAILS_BY_DEPARTMENT + value :
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
    this.surveyDetails.get('surveyId').emit(id);  
  }
  showSurvey(teacherName: string, optimize?: boolean, surveysLength?: number, surveyId?: string){
    this.surveyDetails.set('teacher', teacherName);
    let start = Date.now(),
        finalSurveysArray: Array<any> = [];
    
    if(teacherName !== '0'){
      this.singleSurvey = false;
      this.loaderState(true);
      
      let 
        {surveys} = (this.teachersList.filter(teacher => teacher["fullname"] === teacherName))[0],
        surveyReferencesList = map(surveys, '_reference')
      
      this.sharedService.postCall(SURVEY_LIST, {list: surveyReferencesList, optimize: this.optimize})
        .map(res => res.json().reverse())
        .subscribe(     
          result => {
            let 
                {length} = result;
            this.surveyDetails.set("maxSurveys", length);
            finalSurveysArray = surveysLength <= length ?
              result.slice(0, surveysLength):
              result;
          },
          err => {console.error(err); setTimeout(this.loaderState(false), 2500)},
          () => {
            this.options = this.plotGraph(finalSurveysArray);
            setTimeout(this.loaderState(false), 2500);
        });
    }
    let end = Date.now();
    this.surveyDetails.set('timeToFetch', end - start);
  }
  loaderState(hidden: boolean){
    this.showLoader = hidden;
  }
  
  downloadCSV(){
    console.log(this.surveyDetails.get('surveyId'))
    window.open(`${BASE_URL}/excel/${this.surveyDetails.get('surveyId')}`, '__blank');
  }

  showSingleSurvey(survey){
    let optimize = this.optimize;
    this.sharedService.sendSurvey({survey, optimize});
    this._router.navigate(['/dashboard/survey']);
  }

  plotGraph(surveyArray, type?: string):Object {
    let 
      series        = [],
      index         = 1,
      categories    = null,
      questions     = null,
      date: string  = null,
      options       = {},
      selection     = ["Strongly Disagree", "Disagree", "Uncertain", "Agree", "Strongly Agree"];
    
    each(surveyArray, surveys => {
      let 
        numericDataFromSurvey = surveys.survey 
          .filter(v => typeof v.value === 'number'),  
                    
        value     = numericDataFromSurvey.map( v => v.value);
        
      date        = new Date(surveys.created).toLocaleDateString();
      categories  = numericDataFromSurvey.map(v => `Q${v.id}`);
      questions   = numericDataFromSurvey.map(v => v.question);
      
      series.push({
        "name": date,
        "data": value,
        "allowPointSelect": true
      });
      index += 1;
    });
    
    questions = surveyArray[0].survey.map(v => v.question)
    return options = {
      
      title: { text: surveyArray[0].teacher },
      chart: {
        type: type || 'spline',
        width: 675,
        height: 350
      },
      xAxis: [{
        categories: categories,
        crosshair: true
      }],
      yAxis: [{
        title: { text: 'Value'},
        lineWidth: 1
      }],
      series: series,
      tooltip: {
        animation: true,
        backGroundColor: "rgb(245,245,245)",
        shared: true,
        useHTML: true,
          formatter: function(){
            let 
              qid = this.x.slice(1, this.x.length),
              question = 
                questions[qid] ? 
                  "<strong>"+ this.x +": </strong>" +
                  '<span>' + 
                    questions[qid] + 
                  '</span>'
                  : '',
              info = []
              each(this.points, point => {
                info.push(
                  '<div><strong>Value: </strong><span style="color:' + point.color + '">' +
                    point.y +'</span>' +
                  '</div>' + 
                  '<div><strong>Selection: </strong><span style="color:' + point.color + '">' +
                    selection[Math.round(point.y - 1)] + '</span>' +
                  '</div>'
                )
              });

            return question + info.join('');
          }
      }
    }
  }
}

interface Department{
  value: any | string,
  name: string
}
