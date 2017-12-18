import { Component,OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
    selector: 'course-eval-form',
    templateUrl: './course-eval-form.html',

})
export class CourseEvalForm implements OnInit{
    constructor() {
        
    }
    
    @Input('index') index                               = null;
    @Input('optinos') options                           = null;
    @Input('question') question                         = null;
    @Input('canComment') canComment                     = true;
    @Input('heading') sectionHeading                    = null; 
    @Output('quizReplied') quizReplied                  = new EventEmitter();
    @Output('commentsReplied') commentsReplied          = new EventEmitter();

    ngOnInit(){
        this.options = this.question.options;        
    }

    optionSelected(id, value, selection, question){             
        this.quizReplied.emit({
            id, value, selection,question
        });
    }
    
    getTextValue(id, value,question){
        this.commentsReplied.emit({
            id, value, question
        });
    }
}