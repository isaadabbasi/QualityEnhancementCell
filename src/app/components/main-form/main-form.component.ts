import { TeacherEvaluationForm } from './../../shared/forms/teacher-evaluation-form';
import {Component, OnInit} from '@angular/core';
import 'rxjs/add/operator/debounceTime';

import { QuestionComponent } from './quest.component';
import { SharedService } from '../../shared/shared.service';
import { ADD_SURVEY_URL } from '../../shared/global-vars';
interface SurveyModel {
    _id: number, 
    reply: string,
    value: number
}

@Component({
    selector: 'main-form',
    template: `
        <div class="questionare-body col-xs-12 col-md-offset-2 col-md-8">
            <div class="row main-form-header">
                <div class="" style="display: inline">
                    <img class="teacher-image " src="./assets/images/duet_logo.png">
                </div>
                <div class="pull-right">
                    <ul class="teacher-details">
                        <li>{{selectedDepartment}}</li>
                        <li>{{selectedTeacher}}</li>
                        <li>{{subject? subject: ''}}</li>
                    </ul>
                </div>
            </div>
            <quest 
                *ngFor="let quest of questions, let i=index"
                [percentage]="quest.percentage"
                [index]= "i"
                [question]="quest.question"
                [_id]="quest.q_id"
                (quizReplied)="optionSelected($event)"
            ></quest>

            <div class="form-submittion">
                <button (click)="getStudentRemarks()" class=" btn-lg btn-block btn btn-primary">Submit</button>
            </div>
        </div>  
        `,
    styleUrls: ['main.component.css'],
    providers: [SharedService]
})


export class MainFormComponent implements OnInit{
    constructor(private _sharedService: SharedService){}
    
    selectedTeacher: string = 'Shamim Naich';
    selectedDepartment: string = 'Computer Systems';
    subject: string = null;

    questions: Array<Object> = null;
    survey: Array<SurveyModel> = []; 
    ngOnInit(){
        this.questions = TeacherEvaluationForm
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
    getStudentRemarks(){
        let surveyMetaData = JSON.parse(localStorage.getItem('surveyMetaData'));
        
        let surveyDetails = {
            evaluation: surveyMetaData.evaluation,    //this.subject ? 'course':'teacher',
            target: surveyMetaData.target,    //this.subject || this.selectedTeacher, // should the target be dynamically changed to course name?
            survey: this.survey
        }

        // localStorage.setItem('surveys', JSON.stringify([this.survey]));        
        // if(this.questions.length === this.survey.length)
        console.log('finalized result',  surveyDetails)
        if(surveyDetails.survey.length === this.questions.length){
            console.log('Send Http Request');
            // subscribe also takes and object as param, 
            // in which first key is successResponse, second is Error, third is onComplete Event
            this._sharedService.postCall(ADD_SURVEY_URL, surveyDetails)
            .debounceTime(500)
            .subscribe({
                next: res => { console.log( res )},
                error: error => { console.log( error ) }
            })    
        }else{
            console.log('Stop Http Request');
            
        }
        
    }
}