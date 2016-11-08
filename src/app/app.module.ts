import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2'
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { routing } from './main.router'

import { AppComponent } from './app.component';
import { MainFormComponent } from './main-form/main-form.component';
import { NavBarComponent } from './nav-bar/navbar.component';
import { QuestionComponent } from './main-form//quest.component';
import { LoginComponent } from './login/login.component'

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
    LoginComponent,
    MainFormComponent,
    NavBarComponent,
    QuestionComponent
  ],
  imports: [
    BrowserModule,
    // AngularFireModule.initializeApp(firebaseConfig),
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
