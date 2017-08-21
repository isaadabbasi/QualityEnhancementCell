import {Component, OnInit, Input} from '@angular/core';

@Component({
    selector: 'quest',
    templateUrl: './quest.template.html'
})

export class QuestionComponent implements OnInit{
    constructor(){}

    @Input() question = null;
    @Input() percentage = null;
    @Input() _id = null;
    @Input() index = null;

    options: Array<String> = ['Strongly Disagree', 'Disagree', 'Agree', 'Average', 'Strongly Agree'];

    ngOnInit(){
        console.log('main form initialized');
    }

    minimizeQuest(){
        console.log('minimize');
    }
    hideQuest(id: number){
        console.log('close tab #'+id);
    }

}