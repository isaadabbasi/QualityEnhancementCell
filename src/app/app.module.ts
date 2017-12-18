import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { ChartModule } from "angular2-highcharts";
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';

import { routing } from './main.router'

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component'
import { DashboardSidebarComponent } from './components/dashboard/dashboard-sidebar/sidebar.component';
import { LoginComponent } from './components/login/login.component'
import { MainFormComponent } from './components/main-form/main-form.component';
import { NavBarComponent } from './components/nav-bar/navbar.component';
import { PlaceHolderComponent } from './components/dashboard/dashboard-placeholder/placeholder.component';
import { RankingComponent } from './components/dashboard/dashboard-ranking/ranking.component'
import { StartSurveyComponent } from './components/dashboard/dashboard-start/start.component'
import { SignupComponent } from './components/signup/signup.component';
import { SharedService } from './shared/shared.service';
import { AuthGuard, SessionGuard } from './auth-guard.service';
import { StatsComponent } from "./components/dashboard/dashboard-stats/stats.component";
import { LoaderComponent } from './components/loader/loader';

import { SettingsComponent } from './components/dashboard/dashboard-settings/settings.component';
import { CourseEvalForm } from './components/main-form/course-eval-form.component';
import { DashboardSurveyComponent } from './components/dashboard/dashboard-survey/dashboard-survey.component';
import { SurveysComponent } from './components/dashboard/dashboard-surveys/surveys.component';
import { AlertComponent } from "./components/alert-message/alert-message";
import { ModalModule } from './modal/modal.module';
import { SettingsCrudTableComponent } from './settings-crud-table/settings-crud-table.component';
declare var require: any;

export function highchartsFactory() {
  const hc = require('highcharts');
  const dd = require('highcharts/modules/drilldown');
  dd(hc);

  return hc;
}

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DashboardSidebarComponent,
    LoginComponent,
    MainFormComponent,
    NavBarComponent,
    PlaceHolderComponent,
    RankingComponent,
    StartSurveyComponent,
    SignupComponent,
    StatsComponent,
    SurveysComponent,
    DashboardSurveyComponent,
    CourseEvalForm,
    SettingsComponent,
    LoaderComponent,
    AlertComponent,
    SettingsCrudTableComponent,
    // ModalComponent
  ],
  imports: [
    BrowserModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule,
    ChartModule,
    ModalModule.forRoot(),
    routing
    
  ],
  entryComponents:[
    // ModalComponent
  ],
  providers: [
    AuthGuard, 
    SessionGuard,
    SharedService,
    {
      provide: HighchartsStatic,
      useFactory: highchartsFactory
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
