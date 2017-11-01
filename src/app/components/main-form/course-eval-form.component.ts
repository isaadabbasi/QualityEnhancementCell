import { Component,OnInit, Input, Output, EventEmitter } from "@angular/core";
import * as _ from "lodash";

@Component({
    selector: 'course-eval-form',
    templateUrl: './course-eval-form.html',

})
export class CourseEvalForm implements OnInit{
    constructor() {
        
    }
    @Input('heading') sectionHeading = null 
    @Input() question = null;
    @Input() percentage = null;
    @Input() _id = null;
    @Input() index = null;
    @Input() options = null;
    @Input() canComment = true;
    @Output() quizReplied = new EventEmitter();
    @Output() commentsReplied = new EventEmitter();
    // options: Array<String> = ['Strongly Disagree', 'Disagree', 'Uncertain', 'Agree', 'Strongly Agree'];
    
    ngOnInit(){
        console.log(this.question);
        this.options = this.question.options;
        
    }
    optionSelected(id, selection, value){
        console.log(id, selection)
        
        this.quizReplied.emit({
            id, selection: value, value: selection 
        })
    }
    getTextValue(id, value){
        console.log(id, value);
        this.commentsReplied.emit({
            id, value
        })
    }
}