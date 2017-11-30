import { Component } from '@angular/core';

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
        <app-modal [options]="modalOptions"></app-modal>
        <div  class="placeholder-container"> 
            <img 
                id="placeholder-image" 
                class="placeholder-image animated flip" 
                src="./assets/images/duet_logo.png" />
        </div>
    `
})  
export class PlaceHolderComponent {
    // modalOptions = [,]
    modalOptions = {
        metaData: {
          chaining: false,
          labels: false,
          setOnTop: false
        },
        header: 'Generate Excel',
        body: [{
                type: 'text',
                label: 'Enter Batch',
                placeholder: 'Enter Batch',
                id: 'batch'
            },{
                type: 'text',
                label: 'Enter Subject',
                placeholder: 'Enter Subject',
                id: 'subject'
            }
        ],
        footer: [{
                type: 'button',
                label: 'Submit',
                id: 'submit',
                icon: 'fa fa-check'
            },{
                type: 'button',
                label: 'Cancel',
                id: 'cancel',
                icon: 'fa fa-times'
            }
        ]
    }
    constructor() { }
    
}