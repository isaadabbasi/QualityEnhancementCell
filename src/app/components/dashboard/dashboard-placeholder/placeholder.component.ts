import { Component } from '@angular/core';

import { ModalComponent } from './../../../modal/modal.component';

@Component({
    styles:[`
        .placeholder-image{
            opacity: 0.9;
            width: 30% !important;
            height: 30% !important;
        }
        .placeholder-container{
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 50px;
        }
       
    `],
    template: `
        <div  class="placeholder-container"> 
            <img 
                id="placeholder-image" 
                class="placeholder-image animated flip" 
                src="./assets/images/duet_logo.png" />
        </div>
    `
})  
export class PlaceHolderComponent {
    
    
    constructor() { }
    
}