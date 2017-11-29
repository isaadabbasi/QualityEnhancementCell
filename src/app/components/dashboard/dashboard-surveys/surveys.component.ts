  import { SURVEY_LIST, 
          Departments, 
          TEACHER_DETAILS_BY_DEPARTMENT, 
          TEACHER_DETAILS_BY_NAME
          } from './../../../shared/global-vars';
  import { Component, ViewChild, Output, EventEmitter, OnInit } from '@angular/core';
  import { SharedService } from "./../../../shared/shared.service";
  import { map } from "lodash";
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
    modalPurpose: string;
    openModal: boolean;
    surveyReferencesList: {}[];
    length: any;
    timeToFetch = null;
    showLoader: boolean;
    teachersList: Array<Object>;
    showTeachersList: boolean = false;
    @Output('surveyId') SurveyId: EventEmitter<number> = new EventEmitter<number>();
    surveysArray;
    deparmentsList = Departments;
    optimize;
    onOptimize(teacher){
      this.showSurvey(teacher, this.optimize);
    }
    ngOnInit(){
      let start = Date.now();              
      this.sharedService.getCall(SURVEY_LIST)
      .subscribe(
        next => {
          this.surveysArray = next;
          this.length = this.surveysArray.length;
        },
        err => console.error(err),
        () => {
          this.surveysArray.reverse();  
        }
      );
      let end = Date.now();
      this.timeToFetch = end - start;
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
    showSurvey(teacherName: string, optimize){
      
      let selectedTeacher: Object = {};
      let singleSurveys = [];
      // console.time()
      let start = Date.now()
      if(teacherName !== '0'){
        this.loaderState(true);
        selectedTeacher = (this.teachersList.filter(teacher => teacher["fullname"] === teacherName))[0];
        this.surveysArray = selectedTeacher["surveys"];

        // Should be used to avoid overhead.
        this.surveyReferencesList = map(this.surveysArray, '_reference');
        let list = {
          list: this.surveyReferencesList
        };
        list["optimize"] = optimize;
        this.sharedService.postCall(SURVEY_LIST, list)
          .subscribe(     
            result => {
              if(result.status == 200)
                this.surveysArray = JSON.parse(result["_body"]).reverse()},
            err => {console.error(err); setTimeout(this.loaderState(false), 2500)},
            () => setTimeout(this.loaderState(false), 2500)
          );
        this.length = this.surveysArray.length;
      }
      let end = Date.now();
      this.timeToFetch = end - start;
    }
    loaderState(hidden: boolean){
      this.showLoader = hidden;
    }
    downloadCSV($event){
      this.openModal = true;
      this.modalPurpose = 'survey';
    }
    modalState($event){
      this.openModal = false;
    }
  }