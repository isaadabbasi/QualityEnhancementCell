import { Component, ViewChild } from '@angular/core';

@Component({
    selector: 'stats',
    // template: `
    //     <div>Ranking will be rendered here</div> 
    // `
    templateUrl: './stats.template.html'
})
export class StatsComponent {
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
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'},
    {data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C'}
  ];    //Get data from server.
  public lineChartLabels:Array<any> = ['Survey 1', 'Survey 2', 'Survey 3', 'Survey 4'];
  public lineChartOptions:any = {
    responsive: true
  };
  
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';  //line, bar, radar, pie, polarArea, doughnut
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
}