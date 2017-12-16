import { DeparmentsListItemModel } from './../../../shared/models';
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
  
  deparmentsList:   Array<DeparmentsListItemModel> =  Departments;
  
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
        .map(res => res.json())
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
        console.log(questions);
        


        // { id: categories, question: questions, selection } = numericDataFromSurvey.map(({id, question, selection}) => ({id, question, selection}))
        // let x = numericDataFromSurvey.map(v => ({id: v.id, question: v.question, selection: v.selection}))
        console.log(numericDataFromSurvey)
        series.push({
          "name": date,
          "data": value,
          "allowPointSelect": true
        });
        index += 1;
      });
      console.log(surveyArray)
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
              console.log(this,selection);
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
  loaderState(hidden: boolean){
    this.showLoader = hidden;
  }
  surveyNumber(value){
    console.log(value)
  }
  downloadCSV(){
    window.open(`${BASE_URL}/excel/${this.SurveyId}`, '__blank');
  }
}