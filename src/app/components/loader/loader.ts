import { Component } from '@angular/core';
@Component({
    selector: 'loader',
    template: `
    <div class="loader"></div>    
    `,
    styles: [`
        .loader {
            position: absolute;
            z-index: 15;
            top: 50%;
            left: 50%;
            margin: -100px 0 0 -150px;
            border: 16px solid #f3f3f3; /* Light grey */
            border-top: 16px solid #3498db; /* Blue */
            border-radius: 50%;
            width: 120px;
            height: 120px;
            animation: spin 2s linear infinite;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `]
})
export class LoaderComponent {
    constructor() {
        
    }
}