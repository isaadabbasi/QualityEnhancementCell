import { SurveysComponent } from './components/dashboard/dashboard-surveys/surveys.component';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ChartsModule } from 'ng2-charts';

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
    SurveysComponent
  ],
  imports: [
    BrowserModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule,
    ChartsModule,
    routing
  ],
  providers: [
    AuthGuard, 
    SessionGuard,
    SharedService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
