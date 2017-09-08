import { Component, ViewChild } from '@angular/core';

@Component({
    selector: 'surveys',
    templateUrl: './surveys.template.html'
})
export class SurveysComponent {
  surveysArray = [
    {
      _id : 1,
      evaluation: "teacher",
      target: "Shamim Naich",
      survey: [{

      }],
      created: (new Date()).toLocaleDateString()
    },
    {
      _id : 1,
      evaluation: "teacher",
      target: "ABC",
      survey: [{
        
      }],
      created: (new Date()).toLocaleDateString()
    },
    {
      _id : 1,
      evaluation: "teacher",
      target: "DEF",
      survey: [{
        
      }],
      created: (new Date()).toLocaleDateString()
    }
  ]
}