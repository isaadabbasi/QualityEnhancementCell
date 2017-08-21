import { Component } from '@angular/core';

@Component({
    styles:[`
        .placeholder-image{
            opacity: 0.9;
            width: 70% !important;
            height: 70% !important;
        }
        .placeholder-container{
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 50px;
        }
    `],
    template: `
        <div class="placeholder-container"> 
            <img class="placeholder-image" src="./assets/images/duet_logo.png" />
        </div> 
    `
})  
export class PlaceHolderComponent {
    constructor() { }
}