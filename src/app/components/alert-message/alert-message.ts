import { Component, Input } from '@angular/core';
@Component({
    selector: 'alert-message',
    template: `
    <div id="message" class="col-xs-6 col-xs-offset-3">
        <div id="inner-message" class="alert alert-{{ alertType }} text-center">
            {{ message }}
        </div>
    </div> 
    `,
    styles: [`
        #message {
            position: fixed;
            left: 0;
            top: {{ top || 15% }};
            width: 50%;
            z-index: 999;
        }
        #inner-message {
            margin: 0 auto;
        }
    `]
})
export class AlertComponent {
    @Input('alert-type')
        alertType: string = null;
    @Input('message') 
        message: string = null;
    @Input('top')
        top: string = null;
    constructor() {
        
    }
}