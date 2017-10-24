import { Component,OnInit, Input, Output, EventEmitter } from "@angular/core";

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
    @Output() quizReplied = new EventEmitter();
    options: Array<String> = ['Strongly Disagree', 'Disagree', 'Uncertain', 'Agree', 'Strongly Agree'];
    
    ngOnInit(){
        console.log(this.question);
        
    }
}