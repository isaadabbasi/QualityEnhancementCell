import {Component} from '@angular/core';
import { Router } from '@angular/router'; 
@Component({
    selector: 'my-navbar',
    templateUrl: './navbar.template.html',
    styles:[`
    .navbar-xs { height: 22px; min-height:22px; border-radius:0} 
    .navbar-xs .navbar-brand{ padding: 2px 8px;font-size: 14px;line-height: 14px; } 
    .navbar-xs .navbar-nav > li > a { border-right:1px solid #ddd; padding-top: 2px; padding-bottom: 2px; line-height: 16px }`]
})

export class NavBarComponent {
    constructor(public router: Router){}
    isAuthenticated(){
        return localStorage.getItem('authid');
    }

    logout(){
        localStorage.removeItem('authid');
        // this.af.auth.logout();
        this.router.navigate(['/'])
    }
}