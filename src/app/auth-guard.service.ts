import { LoginComponent } from './components/login/login.component';
import { SharedService } from './shared/shared.service';
import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from "@angular/router";

import { map } from "rxjs/operators";

interface User {
    _id: string,
    rollnumber ?: string,
    email ?: string,
    contact: string,
    password ?: string | null;
}

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild{
    
    constructor(
        private authService: SharedService, 
        private router: Router
        ){}
        
    canActivate(){
        if(this.authService.isLoggedIn()) {
            return true;
        }
        else this.router.navigate(['/login']);
    }
    canActivateChild() {
        
        if(this.authService.isLoggedIn()) {
            return true;
        }
        else this.router.navigate(['/login']);
    }
}

@Injectable()
export class SessionGuard implements CanActivate{
    constructor(private authService: SharedService, 
        private router: Router){

    }
    canActivate(){
        if(!this.authService.isLoggedIn()) {
            return true;
    }
    else 
        this.router.navigate(['/dashboard']);
    }
}
