import { Component } from '@angular/core';
@Component({
    selector: 'qec-dashboard',
    styles:[`
        .dashboard-main-card{
            background: whitesmoke;
            box-shadow: 20px 15px 45px #999;
            padding: 10px 5px;
        }
    `],
    template: `
    <div class="row dashboard-main-card">
        <div class="col-sm-2">
            <dashboard-sidebar></dashboard-sidebar>
        </div>
        <div class="col-sm-10">
            <router-outlet></router-outlet>
        </div>
    </div>`
})

export class DashboardComponent{
    sidebars: Array<String> = ['1', '3', '5'];
    constructor(){
    }
}