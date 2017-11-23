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
    @Input() options = null;    

    ngOnInit(){
    }

    minimizeQuest(){
        console.log('minimize');
    }
    hideQuest(id: number){
        console.log('close tab #'+id);
    }
    optionSelected(id, selection){
        let value:number = this.options.indexOf(selection)+1;

        this.quizReplied.emit({
            id, selection, value
        })
    }

}