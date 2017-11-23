import { TeacherEvaluationForm, courseEvaluationForm } from './../../shared/forms/teacher-evaluation-form';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/debounceTime';

import { QuestionComponent } from './quest.component';
import { CourseEvalForm } from "./course-eval-form.component";
import { SharedService } from '../../shared/shared.service';
import { GET_SURVEY, ADD_SURVEY_URL, Departments } from '../../shared/global-vars';

interface SurveyModel {
    _id: number, 
    reply: string,
    value: number
}

@Component({
    selector: 'main-form',
    templateUrl: './main-form.html',
    styleUrls: ['main.component.css'],
    providers: [SharedService]
})


export class MainFormComponent implements OnInit{
    finalSurveyDetails: { evaluation: any; course: any; teacher: any; survey: SurveyModel[]; };
    purpose: string;
    openModal: any;
    constructor(private _sharedService: SharedService, private router: Router) { }
    surveyComplete = false;
    selectedTeacher: string = '';
    selectedDepartment: string = '';
    subject: string = null;
    surveyMetaData;
    questions: Array<Object> = null;
    survey: Array<SurveyModel> = []; 
    showMessage: boolean = false;
    ngOnInit(){
        this.surveyMetaData = JSON.parse(localStorage.getItem('surveyMetaData'));
        this.selectedTeacher = this.surveyMetaData.teacher || this.surveyMetaData.target;
        this.subject = this.surveyMetaData.course; 
        this.selectedDepartment = JSON.parse(localStorage.getItem('activeUser'))["department"];
        this.selectedDepartment = (Departments.find(o => (o as any).value == this.selectedDepartment))["name"];                
        this.getSurveys();
                
    }
    getSurveys(){
        this._sharedService.getCall(GET_SURVEY + this.surveyMetaData.evaluation.value)
            .subscribe(
                next => {
                    console.log(next);
                    this.questions = next.sections;
                },
                err => console.log(err),
                () => {
                    console.log(this.questions);
                     
                }
            )
    }
    optionSelected(event: SurveyModel){
        console.log(event)
        // this.survey.push(event)
        function isSimilar(element  ) {
            // console.log(element.id, event["id"]);
            
            return element;
        }

        let indexOfEvent = this.survey.findIndex((surveyElement:any) => surveyElement.id == (event as any).id);
        if(indexOfEvent === -1){
            this.survey.push(event)
            
        }else{
            this.survey[indexOfEvent] = event;
        }
        console.log(this.survey);
        
    }
    checkSurveyStatus(){
        console.log(this.questions[this.questions.length - 1]["queries"])
        let surveyDetails = {
            evaluation: this.surveyMetaData.evaluation,    //this.subject ? 'course':'teacher',
            teacher: this.surveyMetaData.teacher,
            course: this.surveyMetaData.course,
            survey: this.survey
        }

        console.log(surveyDetails);
        

        // localStorage.setItem('surveys', JSON.stringify([this.survey]));        
        // if(this.questions.length === this.survey.length)
        console.log('finalized result',  surveyDetails)
        if(surveyDetails.survey.length === this.questions.length){
            return true
        }
    }
    getStudentRemarks(){
        // let surveyMetaData = JSON.parse(localStorage.getItem('surveyMetaData'));
        
        let surveyDetails = {
            evaluation: this.surveyMetaData.evaluation,    //this.subject ? 'course':'teacher',
            course: this.surveyMetaData.course,    //this.subject || this.selectedTeacher, // should the target be dynamically changed to course name?
            teacher: this.surveyMetaData.teacher,
            survey: this.survey
        }

        console.log(surveyDetails);
        let lastSection = this.questions[this.questions.length - 1]["queries"];
        let lastQID = lastSection[lastSection.length - 1]["qid"];
        console.log(lastQID);
        console.log('finalized result',  surveyDetails)
        if(surveyDetails.survey.length >= lastQID){
            this.purpose = 'confirm';
            this.finalSurveyDetails = surveyDetails;
            this.confirmAndSend(this.purpose, true, surveyDetails)
            this.surveyComplete = true;
            console.log('Send Http Request');
            // subscribe also takes and object as param, 
            // in which first key is successResponse, second is Error, third is onComplete Event
             
        }else{
            
            
            console.log('Stop Http Request');
            this.showMessage = true;
            setTimeout(() => {
                this.showMessage = false;
            }, 1500);
        }
    }
    modalState(value: boolean){
        this.openModal = value;
    }
    confirmAndSend(purpose, value, body){
        this.openModal = value;
           
    }
}
