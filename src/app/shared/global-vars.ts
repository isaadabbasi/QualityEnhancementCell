
//APIs
/*
 * naming of global variables does have conventions.
    * all should be capital e.g, GOOGLE_MAP_API.
    * if there are chances collapse with JavaScript provided global variable that does not have
      __<var name>__, pre or post append on your variables. 
    * if global variable is JQuery reference pre-append $.
    * if global variable is Observable or Stream post-append $.
**/


import { LoginComponent } from './../components/login/login.component';
import { DeparmentsListItemModel } from './models';


export const SIGNIN_URL           : string = `/users/login`; // should be renamed 
export const SIGNUP_URL           : string = `/users/register`;
export const GET_SURVEY           : string = `/surveys/form/`;
export const SURVEY_LIST          : string = `/surveys`;
export const ADD_SURVEY_URL       : string = `/surveys/add`; // should be renamed 
export const TEACHER_BASE_URL     : string = `/teachers`;
export const SURVEY_START_URL     : string = `/surveys/start`;
export const TEACHER_DETAILS_URL  : string = `/details`;
export const DOWNLOAD_EXCEL       : string = `/excel`;
export const ADMIN_BASE_URL       : string = `/admins`;
export const ADD_ADMIN            : string = `/add`;    
export const PREFERENCES          : string = `/prefs`
export const 
 TEACHER_DETAILS_BY_DEPARTMENT    : string = `${TEACHER_DETAILS_URL}?department=`;
export const 
 TEACHER_DETAILS_BY_NAME          : string = `${TEACHER_DETAILS_URL}?fullname=`; 

export const Departments          : Array<DeparmentsListItemModel> = [
  {value: '0', name: 'Please Select'},
  {value: 'AP', name: 'Architecture and Planning'},
  {value: 'CH', name: 'Chemical Engineering'},
  {value: 'CS', name: 'Computer Systems'},
  {value: 'ES', name: 'Electronics Engineering'},
  {value: 'EE', name: 'Energy and Environment Engineering'},
  {value: 'IM', name: 'Industrial Engineering and Management'},
  {value: 'MM', name: 'Metallurgy and Materials Engineering'}, 
  {value: 'PG', name: 'Petroleum and Gas Engineering'}, 
  {value: 'TE', name: 'Telecommunication Engineering'}
];