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
  
  SurveyId:         any;
  teachersList:     any;
  
  timeToFetch:      number;
  
  deparmentsList:   Array<Object> =  Departments;
  
  sub:              Subscription;
  
  optimize:         boolean = true;
  showLoader:       boolean = false;
  showDetails:      boolean = false;
  singleSurvey:     boolean = false;
  showTeachersList: boolean = false;
  
  options:          Object;

  
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
      
      this.sharedService.postCall(SURVEY_LIST, {list: surveyReferencesList, optimize: this.optimize})
        .map(res => res.json().reverse())
        .subscribe(     
          result => {
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
      let 
        series    = [],
        index         = 1,
        categories    = null,
        questions     = null,
        selection     = null,
        date: string  = null,
        options     = {};

      each(surveyArray, surveys => {
        let 
          numericDataFromSurvey = surveys.survey 
            .filter(v => typeof v.value === 'number'),  
                      
          value     = numericDataFromSurvey.map( v => v.value);

        date        = new Date(surveys.created).toLocaleDateString();
        categories  = numericDataFromSurvey.map(v => `Q${v.id}`);
        questions   = numericDataFromSurvey.map(v => v.question);
        selection   = numericDataFromSurvey.map(v => v.selection);

        series.push({
          "name": date,
          "data": value,
          "allowPointSelect": true
        });
        index += 1;
      });
      return options = {
        
        title: { text: surveyArray[0].teacher },
        chart: {
          type: type || 'spline',
          width: window.screen.availWidth * .50,
          height: window.screen.availHeight * .45 
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
          headerFormat: "<strong>{point.key}: </strong><table>",
          pointFormatter: function(){
            return( 
                  '<span>' + 
                      questions[this.series.data.indexOf( this )] + 
                  '</span>' + 
                  '<div style="color: "' + this.color + '><strong>Value: </strong>' +
                    this.options.y +
                  '</div>' + 
                  '<div><strong>Selection: </strong>' +
                    selection[this.series.data.indexOf( this )] +
                  '</div>'
                );
          },
          footerFormat: ""
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