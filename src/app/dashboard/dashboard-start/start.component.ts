import { Component, OnInit } from '@angular/core';

@Component({
    template: `
        <div class="col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2 ">
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
                        <select id="department-list" class="form-control" [(ngModel)]="department" name="department">
                            <option value="none">SELECT DEPARTMENT
                            <option value="cs" (click)="startSession()">Computer System
                            <option value="es" >Electronics
                            <option #opt value="ch">Chemical
                            <option value="te">Telecommunication
                            <option value="mm">Metallurgy & Materials
                            <option value="ap">Architecture & Planning
                            <option value="ee">Energy & Environment
                            <option value="im">Industrial Management
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

                    <button class="btn btn-lg btn-danger btn-block" (click)="startSession()" type="submit">Start Sessoin</button>
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
    department: String;
    constructor() { 
        this.year = new Date().getFullYear();
        this.month = this.months[new Date().getMonth()];
    }

    getDepartmentTeacherList(value){
        console.log(value);
    }
    startSession(){
        let department = document.getElementById('department-list');

        console.log(this.department);
    }

    ngOnInit() { }
}