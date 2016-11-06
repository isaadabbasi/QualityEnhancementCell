import {Component, OnInit, Input} from '@angular/core';

@Component({
    selector: 'quest',
    template: `
    <div style="margin:10px 50px;" class="panel panel-primary" id="_id">
        <div style="padding:10px !important;" class="panel-heading">
            <div class="pull-right">
                <button class="btn-xs btn-danger" (click)="hideQuest(_id)">X</button>    
            </div>
        </div>
        <div class="panel-body" *ngIf="true">
            <div class="col-md-3">
                <h1 class="text-center" [ngClass]="{'text-danger': percentage<40, 
                    'text-primary': percentage>=40 && percentage <=60,
                    'text-success': percentage>60}">{{percentage}}%</h1>
            </div>
            <div class="col-xs-12 col-md-9">
                <p class="text-center">{{question}}</p> <hr>
                <div class="text-center"  style="margin:-10px auto"> 
                    <div *ngFor="let opt of options" style="display:inline;">
                        <input type="radio"  name="{{_id}}" value="{{opt}}">{{opt}} &nbsp;
                    </div>
                </div>
            </div>
        </div>
    </div>`
})

export class QuestionComponent implements OnInit{
    constructor(){}



    @Input() question = null;
    @Input() percentage = null;
    @Input() _id = null;

    options: Array<String> = ['Strongly Agree', 'Agree', 'Average', 'Disagree', 'Strongly Disagree'];

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