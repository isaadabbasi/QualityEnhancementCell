import {Component, OnInit} from '@angular/core';

import { QuestionComponent } from './quest.component'

@Component({
    selector: 'main-form',
    template: `
        <div class="questionare-body">
            <div class="main-form-header">
                <div >
                    <img class="teacher-image img-circle" src="./shared/images/thumb.png">
                </div>
            </div>
            <quest *ngFor="let quest of questions"
            [percentage]="quest.percentage"
            [question]="quest.question"
            [_id]="quest.q_id"
            ></quest>

            <button (click)="getStudentRemarks()" class="pull-right btn btn-primary">Submit</button>
        </div>  
        `,
    styleUrls: ['main.component.css']
})

export class MainFormComponent implements OnInit{
    constructor(){}
    questions: Array<Object> = null;
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

}