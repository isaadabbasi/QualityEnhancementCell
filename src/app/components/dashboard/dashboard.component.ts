import { Component, OnInit } from '@angular/core';

import * as localforage from 'localforage';

@Component({
    selector: 'qec-dashboard',
    styles:[`
        .dashboard-main-card{
            background: whitesmoke;
            box-shadow: 3px 3px 5px #999;
            
            align-items: center;
            height: 88vh;
        }
        .my-custom-sidebar {
            background-color: #eeeeee;;
            box-shadow: 1px 1px 5px #999;
            border-top-right-radius: 10px;
            height:100%;
            padding: 0px !important;
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

export class DashboardComponent implements OnInit{
    sidebars: Array<String> = ['1', '3', '5'];
    
    constructor(){
        // console.log(localStorage.getItem("activeUser"));
    }
    ngOnInit(){ }

}