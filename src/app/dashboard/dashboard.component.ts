import { Component } from '@angular/core';
@Component({
    selector: 'qec-dashboard',
    styles:[`
        .dashboard-main-card{
            background: whitesmoke;
            box-shadow: 20px 15px 45px #999;
            display: flex;
            align-items: center;
        }
        .my-custom-sidebar {
            background-color: #eaeaea;
            box-shadow: 2px 0px 15px gray;
            border-radius:10px;
        }
    `],
    template: `
    <div class="row dashboard-main-card">
        <div class="col-xs-12 col-md-1 my-custom-sidebar">
            <dashboard-sidebar></dashboard-sidebar>
        </div>
        <div class="col-xs-12 col-md-11">
            <router-outlet></router-outlet>
        </div>
    </div>`
})

export class DashboardComponent{
    sidebars: Array<String> = ['1', '3', '5'];
    constructor(){
    }
}