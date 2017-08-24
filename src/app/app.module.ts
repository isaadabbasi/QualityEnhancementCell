import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
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
    StartSurveyComponent
  ],
  imports: [
    BrowserModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
