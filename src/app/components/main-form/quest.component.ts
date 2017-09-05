import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

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
    @Output() quizReplied = new EventEmitter();

    options: Array<String> = ['Strongly Disagree', 'Disagree', 'Average', 'Agree', 'Strongly Agree'];

    ngOnInit(){
        console.log('main form initialized');
    }

    minimizeQuest(){
        console.log('minimize');
    }
    hideQuest(id: number){
        console.log('close tab #'+id);
    }
    optionSelected(id, selection){
        // console.log(_id, reply)
        let value:number = this.options.indexOf(selection)+1;

        this.quizReplied.emit({
            id, selection, value
        })
    }

}