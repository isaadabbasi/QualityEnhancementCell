import { Component } from '@angular/core';

@Component({
    styles:[`
        .placeholder-image{
            margin-top:80px;
            opacity: 0.7;
        }
    `],
    templateUrl: `
        <div class="col-xs-offset-2 col-xs-8 placeholder-image">
            <img class="survey-form-image img-responsive" src="./shared/images/duet_logo.png" />
        </div>
        <div class="col-xs-12">
            <h3 class="text-center" style="font-family: fantasy;">With Great Power Comes Great <strong>Responsibility</strong></h3>
        </div>
    `
})
export class PlaceHolderComponent {
    constructor() { }
}