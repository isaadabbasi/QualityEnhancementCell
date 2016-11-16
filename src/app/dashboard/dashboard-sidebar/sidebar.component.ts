import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'dashboard-sidebar',
    styles:[`
    .sidenav-bottom-button{
        margin: 3px;
        padding: 2px;
        border-radius: 20px;
    }
    .sidenav-item{
        border-radius: 5px;
        text-align: center;
    }
    
`],
    template: `
    <div class="sidebar">
          <ul class="nav nav-sidebar">
            <a class="active" title="Teacher Details" routerLink="start">
                <li class="sidenav-item">
                        <div class="fa fa-pencil fa-3x active"></div>
                        <div class="sidenav-bottom-button">Start Survey</div>
                </li>
            </a>
            <hr style="margin: 5px;">
            <a  title="Teacher Details">
                <li class="sidenav-item">
                        <div class="fa fa-check-square-o fa-3x active"></div>
                        <div class="sidenav-bottom-button">View Surveys</div>
                </li>
            </a>
            <hr style="margin: 5px;">
             <a  title="Teacher Details">
                <li class="sidenav-item">
                        <div class="fa fa-trophy fa-3x active"></div>
                        <div class="sidenav-bottom-button">Rankings</div>
                </li>
            </a>
            <hr style="margin: 5px;">
            <a  title="Teacher Details">
                <li class="sidenav-item">
                        <div class="fa fa-line-chart fa-3x active"></div>
                        <div class="sidenav-bottom-button">Statistics</div>
                </li>
            </a>
            <hr style="margin: 5px;">
            <a  title="Teacher Details">
                <li class=" sidenav-item">
                        <div class="fa fa-gears fa-3x active"></div>
                        <div class="sidenav-bottom-button">Settings</div>
                </li>
            </a>
            <hr style="margin: 5px;">
            <a  title="Teacher Details">
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