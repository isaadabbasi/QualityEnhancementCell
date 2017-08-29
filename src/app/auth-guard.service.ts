import { LoginComponent } from './components/login/login.component';
import { SharedService } from './shared/shared.service';
import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from "@angular/router";

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild{
    
    constructor(private authService: SharedService, 
                private router: Router){

    }
    canActivate(){
        if(this.authService.isLoggedIn())   return true;
        else this.router.navigate(['']);

        console.log('i am checking to see if you are logged in')        
        return false;
    }
    canActivateChild() {
        if(this.authService.isLoggedIn())   return true;
        else this.router.navigate(['']);
        console.log('checking child route access');
        return false;
    }
}