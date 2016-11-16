import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'dashboard-sidebar',
    styles:[`
    .sidenav-bottom-button{
        padding: 2px;
        border-radius: 20px;
        text-align:center;
    }
    .sidenav-item{
        border-radius: 5px;
        text-align: center;
    }
    .margin-topten{
        margin-top:10px;
        padding: 5px 10px;
    }
`],
    template: `
    <div class="sidebar">
          <ul class="nav nav-sidebar">
            <a class="col-xs-2 col-md-12 margin-topten" title="Teacher Details" routerLink="start">
                <li class="sidenav-item">
                        <div class="fa fa-pencil fa-3x active"></div>
                        <div class="sidenav-bottom-button">Start Survey</div>
                </li>
            </a>
            <a  class="col-xs-2 col-md-12 margin-topten" title="Teacher Details">
                <li class="sidenav-item">
                        <div class="fa fa-check-square-o fa-3x active"></div>
                        <div class="sidenav-bottom-button">View Surveys</div>
                </li>
            </a>
             <a class="col-xs-2 col-md-12 margin-topten" title="Teacher Details">
                <li class="sidenav-item">
                        <div class="fa fa-trophy fa-3x active"></div>
                        <div class="sidenav-bottom-button">Rankings</div>
                </li>
            </a>
            <a class="col-xs-2 col-md-12 margin-topten" title="Teacher Details">
                <li class="sidenav-item">
                        <div class="fa fa-line-chart fa-3x active"></div>
                        <div class="sidenav-bottom-button">Statistics</div>
                </li>
            </a>
            <a class="col-xs-2 col-md-12 margin-topten" title="Teacher Details">
                <li class=" sidenav-item">
                        <div class="fa fa-gears fa-3x active"></div>
                        <div class="sidenav-bottom-button">Settings</div>
                </li>
            </a>
            <a class="col-xs-2 col-md-12 margin-topten" title="Teacher Details">
                <li class=" sidenav-item">
                        <div class="fa fa-gears fa-3x active"></div>
                        <div class="sidenav-bottom-button">Settings</div>
                </li>
            </a>
          </ul>
        </div>`
})
export class DashboardSidebarComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}