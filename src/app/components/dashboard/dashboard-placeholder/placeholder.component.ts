import { Component, 
         ViewChild, 
         ViewContainerRef,
         ComponentFactoryResolver } from '@angular/core';

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
        <div #modal></div>
        <button type="button" (click)="openModal()" class="btn btn-default"> Open Modal</button>
        
        <div  class="placeholder-container"> 
            <img 
                id="placeholder-image" 
                class="placeholder-image animated flip" 
                src="./assets/images/duet_logo.png" />
        </div>
    `
})  
export class PlaceHolderComponent {
    
    @ViewChild('modal', {read: ViewContainerRef}) container: ViewContainerRef;
    
    openModal(){
        this.container.clear();
        // check and resolve the component
        let comp = this._cfr.resolveComponentFactory(ModalComponent);
        // Create component inside container
        let modalComponent = this.container.createComponent(comp);
        // see explanations
        modalComponent.instance["_ref"] = modalComponent;
        modalComponent.instance.options = this.modalOptions;
        modalComponent.instance.output
            .subscribe(
                console.log
            )
    }
    modalOptions = {
        metaData: {
          chaining: false,
          labels: false,
          setOnTop: true
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
    constructor(private _cfr: ComponentFactoryResolver) { }
    
}