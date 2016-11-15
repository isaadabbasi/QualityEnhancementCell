import { Component, OnInit } from '@angular/core';

@Component({
    template: `
        <div class="col-xs-offset-2 col-xs-8">
            <h1 class="text-center login-title">Start a new Session</h1>
            <div class="account-wall">
                <img class="survey-form-image img-responsive" src="./shared/images/duet_logo.png"
                    alt="">
                <form class="form-signin">
                    <div class="row">
                        <div class="col-xs-6">
                             <select class="form-control" disabled="true">
                                <option value="sample" name="sample" >{{month}}
                            </select>
                        </div>
                         <div class="col-xs-6">
                            <select class="form-control" disabled="true">
                                <option value="sample" name="sample" >{{year}}
                            </select>
                        </div>
                    </div>
                    <br />
                    
                    <div class="form-group">
                        <select class="form-control">
                            <option value="none" name="none" >SELECT DEPARTMENT
                            <option value="cs" name="cse" >Computer System
                            <option value="es" name="cse" >Electronics
                            <option value="ch" name="cse" >Chemical
                            <option value="te" name="cse" >Telecommunication
                            <option value="mm" name="cse" >Metallurgy & Materials
                            <option value="ap" name="cse" >Architecture & Planning
                            <option value="ee" name="cse" >Energy & Environment
                            <option value="im" name="cse" >Industrial Management
                        </select>
                    </div>

                    <div class="form-group">
                        <select class="form-control">
                            <option value="cse" name="cse" >Fahad Iqbal
                            <option value="cse" name="cse" >Motia Rani
                            <option value="cse" name="cse" >Maria Bashir
                            <option value="cse" name="cse" >Suleman Ahmed
                            <option value="cse" name="cse" >Manan Memon
                            <option value="cse" name="cse" >Saleem Phul
                        </select>
                    </div>
                    <div class="form-group">
                        <select class="form-control">
                            <option value="cpp" name="course" >CPP
                            <option value="ccna" name="course" >CCNA
                            <option value="dcn" name="course" >DCN
                            <option value="sns" name="course" >S&S
                            <option value="caed" name="course" >CAED
                        </select>
                    </div>

                    <button class="btn btn-lg btn-danger btn-block" (click)="signIn()" type="submit">Start Sessoin</button>
                    <label class="checkbox pull-left">
                        <input type="checkbox" value="remember-me">
                        Remember me
                    </label>
                    <a href="#" class="pull-right need-help">Need help? </a><span class="clearfix"></span>
                </form>
            </div>
        </div>
`,
    styleUrls:[ '../../login/login.component.css' ]
})
export class StartSurveyComponent implements OnInit {
    year: number;
    month: String;
    months:Array<String> = ["January", "February", "March", "April", "May", "June","July","August", "September", "October", "November", "December"];
    constructor() { 
        this.year = new Date().getFullYear();
        this.month = this.months[new Date().getMonth()];
    }

    ngOnInit() { }
}