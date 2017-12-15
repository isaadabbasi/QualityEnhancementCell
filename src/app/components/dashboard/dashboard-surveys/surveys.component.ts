import { modalOptionsModel } from './../../../modal/modal.interface';
import { Component, ViewChild, Output, EventEmitter, OnInit, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { map } from "lodash";

import { SURVEY_LIST, 
        Departments, 
        TEACHER_DETAILS_BY_DEPARTMENT, 
        TEACHER_DETAILS_BY_NAME,
        DOWNLOAD_EXCEL
} from './../../../shared/global-vars';
import { SharedService } from "./../../../shared/shared.service";
import { TeacherListItem, DeparmentsListItemModel } from './../../../shared/models';

import { ModalComponent } from '../../../modal/modal.component';
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

    @ViewChild('modal', {read: ViewContainerRef}) container: ViewContainerRef;

    modalPurpose          : string;
    openModal             : boolean;
    surveyReferencesList  : {}[];
    length                : any;
    showLoader            : boolean;
    teachersList          : Array<TeacherListItem>;
    timeToFetch           : number | string                 = null;
    showTeachersList      : boolean                         = false;
    deparmentsList        : Array<DeparmentsListItemModel>  = Departments;
    surveyDetails         : Map<string, any>                = new Map();
    @Output('surveyId') 
      SurveyId            : EventEmitter<number>  = new EventEmitter<number>();
    optimize;
    surveysArray;

    onOptimize(teacher){
      this.showSurvey(teacher, this.optimize);
    }
    ngOnInit(){
      let start = Date.now();              
      this.sharedService.getCall(SURVEY_LIST)
      .subscribe(
        next => {
          console.log(this.surveysArray)
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
    constructor(private sharedService: SharedService,
                private _cfr: ComponentFactoryResolver){
    }
    getNextList(entity: string, value: string){
      let URL = entity === 'teachers' && value != "0"? 
        TEACHER_DETAILS_BY_DEPARTMENT + value 
        :
        '';
      if(value != "0"){
        this.surveyDetails.set('dept', value);
        this.showTeachersList = true;
        this.sharedService.getCall(URL)
          .subscribe(
            next => {
              console.log(next)
              this.showTeachersList = true;
              this.teachersList = next;
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
      this.surveyDetails.set('teacher', teacherName);
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
      let modalOptions: modalOptionsModel = {
        metaData: {
          chaining: false,
          labels: false,
          setOnTop: true
        },
        header: 'Generate Excel',
        body: [{
                type: 'text',
                label: 'Enter Batch',
                placeholder: 'Enter Batch',
                id: 'batch'
            },{
                type: 'text',
                label: 'Enter Subject',
                placeholder: 'Enter Subject',
                id: 'subject'
            }
        ],
        footer: [{
                type: 'button',
                label: 'Submit',
                id: 'submit',
                icon: 'fa fa-check'
            },{
                type: 'button',
                label: 'Cancel',
                id: 'cancel',
                icon: 'fa fa-times'
            }
        ]
      };
      this.container.clear();
      // check and resolve the component
      let comp = this._cfr.resolveComponentFactory(ModalComponent);
      // Create component inside container
      let modalComponent = this.container.createComponent(comp);
      
      modalComponent.instance["_ref"] = modalComponent;
      modalComponent.instance.options = modalOptions;
      
      
      modalComponent.instance.output
        .subscribe( output => {
            if(output.get('status') != 'cancel'){
                let batch = !!output.get("batch") ? `&batch=${output.get("batch")}` : '',
                  subject = !!output.get("subject") ? `&subject=${output.get("subject")}`: '',
                  URL     = `${DOWNLOAD_EXCEL}?teacher=${this.surveyDetails.get("teacher")}&dept=${this.surveyDetails.get("dept")}${batch}${subject}`;  
                  console.log(URL);
                window.open(URL, '__blank');
            }

      });

      
      this.openModal = true;
      this.modalPurpose = 'survey';
    }
    modalState($event){
      this.openModal = false;
    }
  }