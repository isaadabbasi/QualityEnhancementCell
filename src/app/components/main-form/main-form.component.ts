
import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';

import { each } from "lodash";


import { ModalComponent } from './../../modal/modal.component';
import { ModalComponentFactory } from './../../modal/modal.service';
import { SharedService } from '../../shared/shared.service';
import { GET_SURVEY, ADD_SURVEY_URL, Departments } from '../../shared/global-vars';

interface SurveyModel {
    _id: number, 
    reply: string,
    value: number,
    question: string
}; 
interface FinalSurveyModel { 
    studentId: number, 
    batch: number, 
    dept: string, 
    evaluation: string; 
    course: string; 
    teacher: string; 
    survey: SurveyModel[]; 
}

@Component({
    selector: 'main-form',
    templateUrl: './main-form.html',
    styleUrls: ['main.component.css'],
    providers: [SharedService]
})


export class MainFormComponent implements OnInit{
    @ViewChild('modal', {read: ViewContainerRef}) 
        container       : ViewContainerRef;    

    finalSurveyDetails  : FinalSurveyModel; //DOM Binding
    
    selectedTeacher     : string = '';
    selectedDepartment  : string = '';
    subject             : string = null;
    
    questions           : Array<Object>         = null;
    survey              : Array<SurveyModel>    = []; 
    
    showMessage         : boolean = false;
    surveyComplete      : boolean = false;
    surveyMetaData;

    constructor(private _sharedService: SharedService, 
                private router: Router,
                private modalCF: ModalComponentFactory
            ) { }
    

    ngOnInit(){
        this.surveyMetaData     = JSON.parse(localStorage.getItem('surveyMetaData'));
        this.selectedTeacher    = this.surveyMetaData.teacher || this.surveyMetaData.target;
        this.subject            = this.surveyMetaData.course; 
        this.selectedDepartment = JSON.parse(localStorage.getItem('activeUser'))["department"];
        this.selectedDepartment = (Departments.find(o => (o as any).value == this.selectedDepartment))["name"];                
        
        this.getSurveys();                
    }
    getSurveys(){
        console.log(GET_SURVEY + this.surveyMetaData.evaluation)
        this._sharedService.getCall(GET_SURVEY + this.surveyMetaData.evaluation)
            .subscribe(
                next => this.questions = next["sections"],
                console.error
            )
    }
    optionSelected(event: SurveyModel){
        let indexOfEvent = 
            this.survey
                .findIndex((surveyElement: any) => surveyElement.id == (event as any).id);
        
        if(indexOfEvent === -1){
            this.survey.push(event)
        }else{
            this.survey[indexOfEvent] = event;
        }
    }

    checkSurveyStatus(){
        let surveyDetails = {
            teacher : this.surveyMetaData.teacher,
            course  : this.surveyMetaData.course,
            survey  : this.survey
        }
        return !!(surveyDetails.survey.length === this.questions.length)
        
    }
    getStudentRemarks(){  

        let rollnumber      = JSON.parse(localStorage.getItem('activeUser'))["rollnumber"].split('-'),
            surveyDetails   = {
                batch       : rollnumber[1],
                dept        : rollnumber[2], 
                studentId   : rollnumber[3],
                evaluation  : this.surveyMetaData.evaluation,    
                course      : this.surveyMetaData.course,    
                teacher     : this.surveyMetaData.teacher,
                survey      : this.survey
            },
            lastSection     = this.questions[this.questions.length - 1]["queries"],
            lastQID         = lastSection[lastSection.length - 1]["qid"],
            commentsCounter = 0;

            each(this.questions, section => {
                commentsCounter += +section["canComment"];
            });

        if(surveyDetails.survey.length == lastQID + commentsCounter){

            let modalOptions = {
                metaData: {
                    chaining: false,
                    labels: false,
                    setOnTop: true,
                    type: 'confirm'
                  },
                header: 'Submit form',
                body: [{
                    html:{
                        h2: [
<<<<<<< HEAD
                            'Are you sure to send?'
=======
                            'Are you sure to submit form?'
>>>>>>> 33e772a94cc98cd1c96aeb53c65f7e981900a525
                        ],
                        p: [
                            'You can not undo this action.'
                        ],
                    }
                }],
                footer: [{
                    type: 'button',
                    label: 'Yes, I am sure.',
                    id: 'submit',
                    icon: 'fa fa-check'
                },{
                    type: 'button',
                    label: 'Cancel',
                    id: 'cancel',
                    icon: 'fa fa-times'
                }]
            }
            this.modalCF.generateModal(this.container, modalOptions)
            .subscribe(
                res => {
                    if(res.get('status') == 'submit')
                        this._sharedService.postCall(ADD_SURVEY_URL, surveyDetails)
                            .subscribe( res => this.router.navigate(['/']) );
                }
            )
            
            this.surveyComplete = true;
            // subscribe also takes and object as param, 
            // in which first key is successResponse, second is Error, third is onComplete Event
             
        }else{
            this.showMessage = true;
            setTimeout(() => {
                this.showMessage = false;
            }, 1500);
        }
    }
}
