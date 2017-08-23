import {Component, OnInit} from '@angular/core';

import { QuestionComponent } from './quest.component';

interface SurveyModel {
    _id: number, 
    reply: string
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
                        <li>Fahad   Iqbal</li>
                        <li>CSE</li>
                        <li>OS, CAO</li>
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

            <button (click)="getStudentRemarks()" class="pull-right btn btn-primary">Submit</button>
        </div>  
        `,
    styleUrls: ['main.component.css']
})


export class MainFormComponent implements OnInit{
    constructor(){}
    questions: Array<Object> = null;
    survey: Array<SurveyModel> = []; 
    ngOnInit(){
        this.questions = [
            {q_id: 1,
            question:'Does he/she arrives and leave the class on time',
            percentage: 88
            },
            {q_id: 2,
            question:'Is he/she fair in examination and session marks',
            percentage: 35
            },
            {q_id: 3,
            question:'Do she/he provide some content other than course material to help the course content',
            percentage: 80
            },
            {q_id: 4,
            question:'He/She does any kind of gender, religious or linguistic discremination',
            percentage: 56
            },
            {q_id: 5,
            question:'Do she/he provide some content other than course material to help the course content',
            percentage: 78
            },
            {q_id: 6,
            question: 'Does he/she arrives and leave the class on time',
            percentage: 22
            },
        ] 
    }

    optionSelected(event: SurveyModel){
        console.log(event)
        this.survey.push(event)
    }
    getStudentRemarks(){
        console.log('finalized result', this.survey)
    }
}