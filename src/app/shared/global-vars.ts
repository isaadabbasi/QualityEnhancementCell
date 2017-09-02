import { LoginComponent } from './../components/login/login.component';
import { Routes } from '@angular/router';
//APIs
export const BASE_URL: string = `http://localhost:3000`  //Will be updated on deployment
    
// naming of global variables does have conventions.
//1- all should be capital e.g, GOOGLE_MAP_API.
//2- if there are chances collapse with JavaScript provided global variable that does not have __<var name>__, pre or post append on your variables. 
//3- if global variable is JQuery reference pre-append $.
//4- if global variable is Observable or Stream post-append $.


export const SIGNIN_URL: string = `${BASE_URL}/users/login`; // should be renamed 
export const ADD_SURVEY_URL: string = `${BASE_URL}/surveys/add`; // should be renamed 
export const SIGNUP_URL: string = `${BASE_URL}/users/registration`;
export const SURVEY_START_URL: string = `${BASE_URL}/surveys/start`;
