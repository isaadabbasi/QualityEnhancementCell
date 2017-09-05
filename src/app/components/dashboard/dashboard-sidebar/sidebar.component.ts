import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'dashboard-sidebar',
    styles:[`
    a: hover {
        text-decoration: none !important;
        // border-bottom:none!important;
    }
    .sidenav-text{
        padding: 2px;
        border-radius: 20px;
        text-align:center;
        
    }
    .sidenav-item{
        border-radius: 5px;
        text-align: center;
        color: #666;
    }

    .active-link > li > .fa, .active-link > li > .sidenav-text  {
        color: #337ab7 !important;
    }
    .side-option{
        padding: 20px 0;
    }
    .side-option: hover{ 
        text-decoration: none !important;
    }
`],
    template: `
    <div class="sidebar">
          <ul class="nav nav-sidebar">
            <a class="col-xs-2 col-md-12 side-option" title="Start Survey" routerLinkActive="active-link" routerLink="start">
                <li class="sidenav-item">
                        <div class="fa fa-pencil fa-3x active"></div>
                        <div class="sidenav-text">Start Survey</div>
                </li>
            </a>
            <a  class="col-xs-2 col-md-12 side-option" title="View Surveys" routerLinkActive="active-link">
                <li class="sidenav-item">
                        <div class="fa fa-check-square-o fa-3x active"></div>
                        <div class="sidenav-text">View Surveys</div>
                </li>
            </a>
             <a class="col-xs-2 col-md-12 side-option" title="Rankings" routerLinkActive="active-link" routerLink="rankings">
                <li class="sidenav-item">
                        <div class="fa fa-trophy fa-3x active"></div>
                        <div class="sidenav-text">Rankings</div>
                </li>
            </a>
            <a class="col-xs-2 col-md-12 side-option" title="Statistics" routerLinkActive="active-link" routerLink="stats">
                <li class="sidenav-item">
                        <div class="fa fa-line-chart fa-3x active"></div>
                        <div class="sidenav-text">Statistics</div>
                </li>
            </a>
            <a class="col-xs-2 col-md-12 side-option" title="Settings">
                <li class=" sidenav-item">
                        <div class="fa fa-gears fa-3x active"></div>
                        <div class="sidenav-text">Settings</div>
                </li>
            </a>
          </ul>
        </div>`
})
export class DashboardSidebarComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}