import { Component, OnInit } from '@angular/core';

@Component({
    template: `
        <div class="col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2 animated bounceInRight">
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
                        <select class="form-control" #dept (change)="getDepartmentTeacherList(dept.value)">
                            <option value="none" [selected]="true"> Select Department
                            <option value="cs" >Computer System
                            <option value="es" >Electronics
                            <option value="ch">Chemical
                            <option value="te">Telecommunication
                            <option value="mm">Metallurgy & Materials
                            <option value="ap">Architecture & Planning
                            <option value="ee">Energy & Environment
                            <option value="im">Industrial Management
                        </select>
                    </div>

                    <div class="form-group">
                        <select [disabled]="!teachers" class="form-control">
                            <option value="cse" name="cse" [selected]="!teachers">Select Teacher
                            <option value="cse" name="cse" >Fahad Iqbal
                            <option value="cse" name="cse" >Motia Rani
                            <option value="cse" name="cse" >Maria Bashir
                            <option value="cse" name="cse" >Suleman Ahmed
                            <option value="cse" name="cse" >Manan Memon
                            <option value="cse" name="cse" >Saleem Phul
                        </select>
                    </div>
                    <div class="form-group">
                        <select class="form-control" [disabled]="!subjects">
                            <option value="cpp" name="course" [selected]="!subjects">Select Subject
                            <option value="cpp" name="course" >CPP
                            <option value="ccna" name="course" >CCNA
                            <option value="dcn" name="course" >DCN
                            <option value="sns" name="course" >S&S
                            <option value="caed" name="course" >CAED
                        </select>
                    </div>

                    <button class="btn btn-lg btn-danger btn-block" (click)="startSession()" type="submit">Start Sessoin</button>
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

    getDepartmentTeacherList(value){
        console.log('from args: ', value);
    }
    startSession(){
        // console.log(this.department);
    }

    ngOnInit() { }
}