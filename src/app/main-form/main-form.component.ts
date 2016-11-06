import {Component, OnInit} from '@angular/core';

import { QuestionComponent } from './quest.component'

@Component({
    selector: 'main-form',
    template: `<quest *ngFor="let quest of questions"></quest>`,
    styleUrls: ['main.component.css']
})

export class MainFormComponent implements OnInit{
    constructor(){}
    questions: Array<Number> = [1,2,3,4];
    ngOnInit(){
        console.log('main form initialized');
    }

}