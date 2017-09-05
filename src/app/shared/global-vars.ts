import { LoginComponent } from './../components/login/login.component';
import { Routes } from '@angular/router';
//APIs
/*
 * naming of global variables does have conventions.
    * all should be capital e.g, GOOGLE_MAP_API.
    * if there are chances collapse with JavaScript provided global variable that does not have
      __<var name>__, pre or post append on your variables. 
    * if global variable is JQuery reference pre-append $.
    * if global variable is Observable or Stream post-append $.
**/

export const BASE_URL: string = `http://localhost:3000`  //Will be updated on deployment

export const SIGNIN_URL: string = `${BASE_URL}/users/login`; // should be renamed 
export const SIGNUP_URL: string = `${BASE_URL}/users/registration`;
export const ADD_SURVEY_URL: string = `${BASE_URL}/surveys/add`; // should be renamed 
export const SURVEY_START_URL: string = `${BASE_URL}/surveys/start`;
