import { Component } from '@angular/core';

@Component({
    selector: 'qec-dashboard',
    templateUrl: './dashboard.template.html',
    styleUrls: ['qec-dashboard.component.css']
})

export class DashboardComponent{
    sidebars: Array<String> = ['1', '3', '5'];
    constructor(){
    }
}