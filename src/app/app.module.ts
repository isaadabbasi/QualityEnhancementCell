import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { routing } from './main.router'

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component'
import { DashboardSidebarComponent } from './dashboard/dashboard-sidebar/sidebar.component';
import { LoginComponent } from './login/login.component'
import { MainFormComponent } from './main-form/main-form.component';
import { NavBarComponent } from './nav-bar/navbar.component';
import { PlaceHolderComponent } from './dashboard/dashboard-placeholder/placeholder.component';
import { QuestionComponent } from './main-form//quest.component';
import { StartSurveyComponent } from './dashboard/dashboard-start/start.component'

const myFirebaseAuthConfig = {
  provider: AuthProviders.Custom,
  method: AuthMethods.Password
}

export const firebaseConfig = {
    apiKey: "AIzaSyDGAd9mRNSP3mWXB_MdnwXxaeJsWKqqPgE",
    authDomain: "qehancementc.firebaseapp.com",
    databaseURL: "https://qehancementc.firebaseio.com",
    storageBucket: "qehancementc.appspot.com",
    messagingSenderId: "864675246842"
};

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
    StartSurveyComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig,myFirebaseAuthConfig),
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
