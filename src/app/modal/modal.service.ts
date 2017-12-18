import { modalOptionsModel } from './modal.interface';
import { Subscribable } from 'rxjs/Observable';
import { Injectable, ViewContainerRef, ComponentFactoryResolver } from "@angular/core";
import { ModalComponent } from './modal.component';

@Injectable()
export class ModalComponentFactory {
    constructor(private _cfr: ComponentFactoryResolver ) {
        
    }
    
    generateModal(container     : ViewContainerRef, 
                  modalOptions  : modalOptionsModel
                ): Subscribable<Map<string, any>>{
        container.clear();
        // check and resolve the component
        let comp                        = this._cfr.resolveComponentFactory(ModalComponent),
        // Create component inside container
        modalComponent                  = container.createComponent(comp);
        
        modalComponent.instance["_ref"] = modalComponent;
        modalComponent.instance.options = modalOptions;
        
        return modalComponent.instance.output
    }
}