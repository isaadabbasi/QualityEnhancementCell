import { TeacherEvaluationForm, courseEvaluationForm } from './../../shared/forms/teacher-evaluation-form';
import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/debounceTime';

import { QuestionComponent } from './quest.component';
import { CourseEvalForm } from "./course-eval-form.component";
import { SharedService } from '../../shared/shared.service';
import { ADD_SURVEY_URL, Departments } from '../../shared/global-vars';
interface SurveyModel {
    _id: number, 
    reply: string,
    value: number
}

@Component({
    selector: 'main-form',
    template: `
        <div class="questionare-body col-xs-12 col-md-offset-1 col-md-10">
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
            <div class="scrollbar" id="style-1" style="height: 70vh; overflow-y: scroll;">
                <div *ngIf="this.surveyMetaData.evaluation == 'teacher'">
                    <quest 
                        *ngFor="let quest of questions, let i=index"
                        [percentage]="quest.percentage"
                        [index]= "i"
                        [question]="quest.question"
                        [_id]="quest.q_id"
                        (quizReplied)="optionSelected($event)"
                    ></quest>
                </div>
                <div *ngIf="this.surveyMetaData.evaluation == 'course'">
                    <course-eval-form  *ngFor="let section of questions, let i=index"
                        
                        [index]="i"
                        [heading]="section.name"
                        [question]="section.questionArray"
                        (quizReplied)="optionSelected($event)"                
                    ></course-eval-form>
                </div>
                <div class="form-submittion">
                    <button (click)="getStudentRemarks()" [disabled]="!surveyComplete" class=" btn-lg btn-block btn btn-primary">Submit</button>
                </div>
            </div>                
        </div>  
        `,
    styleUrls: ['main.component.css'],
    providers: [SharedService]
})


export class MainFormComponent implements OnInit{
    constructor(private _sharedService: SharedService, private router: Router){}
    surveyComplete = false;
    selectedTeacher: string = '';
    selectedDepartment: string = '';
    subject: string = null;
    surveyMetaData;
    questions: Array<Object> = null;
    survey: Array<SurveyModel> = []; 
    ngOnInit(){
        this.surveyMetaData = JSON.parse(localStorage.getItem('surveyMetaData'));
        this.selectedTeacher = this.surveyMetaData.teacher || this.surveyMetaData.target;
        this.subject = this.surveyMetaData.teacher ? this.surveyMetaData.target : ''; 
        this.selectedDepartment = JSON.parse(localStorage.getItem('activeUser'))["department"];
        this.selectedDepartment = (Departments.find(o => (o as any).value == this.selectedDepartment))["name"];
        
        this.questions = !!this.surveyMetaData.teacher ? courseEvaluationForm : TeacherEvaluationForm;
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
        // let surveyMetaData = JSON.parse(localStorage.getItem('surveyMetaData'));
        
        let surveyDetails = {
            evaluation: this.surveyMetaData.evaluation,    //this.subject ? 'course':'teacher',
            target: this.surveyMetaData.target,    //this.subject || this.selectedTeacher, // should the target be dynamically changed to course name?
            survey: this.survey
        }

        console.log(surveyDetails);
        

        // localStorage.setItem('surveys', JSON.stringify([this.survey]));        
        // if(this.questions.length === this.survey.length)
        console.log('finalized result',  surveyDetails)
        if(surveyDetails.survey.length === this.questions.length){
            this.surveyComplete = true;
            console.log('Send Http Request');
            // subscribe also takes and object as param, 
            // in which first key is successResponse, second is Error, third is onComplete Event
            this._sharedService.postCall(ADD_SURVEY_URL, surveyDetails)
            .debounceTime(500)
            .subscribe({
                next: res => { 
                    console.log( res );
                    this.router.navigate(['/dashboard']);
                },
                error: error => { console.log( error ) }
            })    
        }else{
            console.log('Stop Http Request');
            
        }
        
    }
}
