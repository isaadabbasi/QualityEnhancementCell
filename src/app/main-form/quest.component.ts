import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'quest',
    template: `
    <div style="margin:10px 50px;" class="panel panel-primary">
        <div style="padding:2px !important;" class="panel-heading">
        </div>
        <div class="panel-body">
            <div class="col-xs-3">
                <h1 class="text-center">90%</h1>
            </div>
            <div class="col-xs-9">
                <p class="text-center">Does he/she arrives and leave the class lecture on time?</p>
                <div class="text-center"> 
                    <input type="radio" name="question1" value="Strongly Agree">Strongly Agree
                    <input type="radio" name="question1" value="Agree">Agree
                    <input type="radio" name="question1" value="Average">Average
                    <input type="radio" name="question1" value="Disagree">Disagree
                    <input type="radio" name="question1" value="Strongly Disagree">Strongly Disagree
                </div>
            </div>
        </div>
    </div>`,
})

export class QuestionComponent implements OnInit{
    constructor(){}

    ngOnInit(){
        console.log('main form initialized');
    }
    
}