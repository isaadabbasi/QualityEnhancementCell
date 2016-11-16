import { Component } from '@angular/core';
@Component({
    selector: 'qec-dashboard',
    styles:[`
        .dashboard-main-card{
            background: whitesmoke;
            box-shadow: 20px 15px 45px #999;
        }
        .my-custom-sidebar {
           background-color: #eaeaea;
        }
    `],
    template: `
    <div class="row dashboard-main-card">
        <div class="col-xs-2 col-md-1 my-custom-sidebar">
            <dashboard-sidebar></dashboard-sidebar>
        </div>
        <div class="col-xs-10 col-md-11">
            <router-outlet></router-outlet>
        </div>
    </div>`
})

export class DashboardComponent{
    sidebars: Array<String> = ['1', '3', '5'];
    constructor(){
    }
}