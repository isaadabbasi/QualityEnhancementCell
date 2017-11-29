import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartModule } from "angular2-highcharts";
// import { ChartsModule } from 'ng2-charts';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';

import { routing } from './main.router'

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component'
import { DashboardSidebarComponent } from './components/dashboard/dashboard-sidebar/sidebar.component';
import { LoginComponent } from './components/login/login.component'
import { MainFormComponent } from './components/main-form/main-form.component';
import { NavBarComponent } from './components/nav-bar/navbar.component';
import { PlaceHolderComponent } from './components/dashboard/dashboard-placeholder/placeholder.component';
import { QuestionComponent } from './components/main-form//quest.component';
import { RankingComponent } from './components/dashboard/dashboard-ranking/ranking.component'
import { StartSurveyComponent } from './components/dashboard/dashboard-start/start.component'
import { SignupComponent } from './components/signup/signup.component';
import { SharedService } from './shared/shared.service';
import { AuthGuard, SessionGuard } from './auth-guard.service';
import { StatsComponent } from "./components/dashboard/dashboard-stats/stats.component";
import { LoaderComponent } from './components/loader/loader';
import { DashboardModalComponent } from './components/dashboard/dashboard-modal/dashboard-modal';
import { SettingsComponent } from './components/dashboard/dashboard-settings/settings.component';
import { CourseEvalForm } from './components/main-form/course-eval-form.component';
import { DashboardSurveyComponent } from './components/dashboard/dashboard-survey/dashboard-survey.component';
import { SurveysComponent } from './components/dashboard/dashboard-surveys/surveys.component';
import { AlertComponent } from "./components/alert-message/alert-message";
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
    QuestionComponent,
    RankingComponent,
    StartSurveyComponent,
    SignupComponent,
    StatsComponent,
    SurveysComponent,
    DashboardSurveyComponent,
    CourseEvalForm,
    SettingsComponent,
    DashboardModalComponent,
    LoaderComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule,
    ChartModule,
    routing
    
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
