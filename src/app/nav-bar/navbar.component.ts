import {Component} from '@angular/core';
// import { AngularFire} from 'angularfire2';
import { Router } from '@angular/router'; 
@Component({
    selector: 'my-navbar',
    templateUrl: './navbar.template.html'
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