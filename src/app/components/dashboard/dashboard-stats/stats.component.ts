import { Observable } from 'rxjs/Observable';
import { OnInit } from '@angular/core';
import { SURVEY_LIST, TEACHER_BASE_URL, TEACHER_DETAILS_URL, Departments, TEACHER_DETAILS_BY_DEPARTMENT } from './../../../shared/global-vars';
import { SharedService } from './../../../shared/shared.service';
import { Component, ViewChild } from '@angular/core';
import * as _ from "lodash";

@Component({
    selector: 'stats',
    templateUrl: './stats.template.html',
    styleUrls: ['./stats.css']
})
export class StatsComponent implements OnInit{
  teacherSurvey: {}[];
  showLoader: boolean;
  timeToFetch: number;
  length: any;
  surveysArray: any;
  SurveyId: any;
  teachersList: any;
  showTeachersList: boolean;
  deparmentsList = Departments;
  showDetails: Boolean = false;
    // lineChart
  public surveys = [
    { data : [4.6, 4.1, 4.6, 4.1], label: 'Engr. Fahad Iqbal'},
    // { data: [1,2,3,4,5,6,7,8,9,1], avg: 4.6, label: 'Survey 1'},
    // { data: [1,9,3,6,5,4,7,8,2,1], avg: 4.1, label: 'Survey 2'},
    // { data: [1,2,3,4,5,6,7,8,9,1], avg: 4.6, label: 'Survey 3'},
    // { data: [5,2,7,4,5,6,1,8,2,1], avg: 4.1, label: 'Survey 4'}
  ];
  public lineChartData:Array<any> = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'}
  ];    //Get data from server.
  public lineChartLabels:Array<any> = ['Survey 1'];
  public lineChartOptions:any = {
    responsive: true
  };
  
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'bar';  //line, bar, radar, pie, polarArea, doughnut
  public detailsChartType: string = 'bar'
  public randomize():void {
    let _lineChartData:Array<any> = new Array(this.lineChartData.length);
    for (let i = 0; i < this.lineChartData.length; i++) {
      _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
      }
    }
    this.lineChartData = _lineChartData;
  }
 
  @ViewChild('myModal') myModal;
  // events
  public chartClicked(e:any):void {
    this.showDetails = true;
    console.log(e);
    
  }

  public chartHovered(e:any):void {
    console.log(e);
  }
  options: Object;
  ngOnInit(){
    this.sharedService.getCall(TEACHER_DETAILS_URL)
      .subscribe( next => {
        console.log(next["body"]);
      })
  }
  constructor(private sharedService: SharedService){
    this.sharedService.getCall(SURVEY_LIST).subscribe(
        next => {
          console.log(next)
          console.log(_.filter(next, (survey) => survey["evaluation"] == "teacher"));
        },
        err => console.log(err),
        () => {
          
        }
      )
    this.options = {
      title: { text: 'simple chart'},
      series: [{
        name: 'Question No.',
        data: [2, 3, 5, 8, 13],
        allowPointSelect: true
      }]
    }
  }
  getNextList(entity: string, value: string){
    let URL = entity === 'teachers' && value != "0"? 
      TEACHER_DETAILS_BY_DEPARTMENT + value 
      :
      '';
    if(value != "0"){
      this.showTeachersList = true;
      console.log(URL, value, this.showTeachersList);
      this.sharedService.getCall(URL)
        .subscribe(
          next => {
            this.showTeachersList = true;
            console.log(next)
            this.teachersList = next["body"];
          },
          err => console.log(err),
          () => console.log('complete')
        )
      }else{
        this.showTeachersList = false;
      }
    }
      
  viewSurvey(id){
    this.SurveyId.emit(id);  
  }
  showSurvey(teacherName: string){
    
    let selectedTeacher: Object = {};
    let singleSurveys = [];
    // console.time()
    let start = Date.now()
    if(teacherName !== '0'){
      this.loaderState(true);
      selectedTeacher = (this.teachersList.filter(teacher => teacher["fullname"] === teacherName))[0];
      this.surveysArray = selectedTeacher["surveys"];
      _.forEach(this.surveysArray, survey => {
        singleSurveys.push(this.sharedService.getCall(`${SURVEY_LIST}/id/${survey._reference}`));
        
      });
      
      Observable.forkJoin(singleSurveys)
        .subscribe(
          result => {
            console.log(result)
            this.teacherSurvey = result;
          },
          err => console.log(err),
          () => setTimeout(this.loaderState(false), 2500)
        )
      this.length = this.surveysArray.length;
      console.log(this.surveysArray.length);
    }
    let end = Date.now();
    this.timeToFetch = end - start;
    console.log(this.timeToFetch, 'ms');
  }
  loaderState(hidden: boolean){
    this.showLoader = hidden;
  }
}