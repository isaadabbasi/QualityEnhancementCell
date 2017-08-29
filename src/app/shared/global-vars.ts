import { LoginComponent } from './../components/login/login.component';
import { Routes } from '@angular/router';
//APIs
export const baseURL: string = `http://localhost:3000`  //Will be updated on deployment

export const signInURL: string = `${baseURL}/users/login`;
