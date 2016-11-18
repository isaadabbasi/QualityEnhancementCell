import { Component } from '@angular/core';

@Component({
    styles:[`
        .placeholder-image{
            margin-top:80px;
            opacity: 0.8;
        }
    `],
    templateUrl: `
        <div class="col-xs-offset-2 col-xs-8 col-sm-offset-3 col-sm-6 col-md-6 col-md-offset-3 placeholder-image animated flipInY">
            <img class="survey-form-image img-responsive" src="./shared/images/duet_logo.png" />
        </div>
    `
})  
export class PlaceHolderComponent {
    constructor() { }
}