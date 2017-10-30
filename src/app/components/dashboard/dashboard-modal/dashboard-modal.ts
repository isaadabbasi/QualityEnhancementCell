import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import swal from "sweetalert2";

@Component({
    selector: 'dashoard-modal',
    template: ``
})
export class DashboardModalComponent implements OnInit {
    inputOptions;
    constructor(private router: Router) {
        this.inputOptions = new Promise(function (resolve) {
            setTimeout(function () {
              resolve({
                teacher: 'Teacher Evaluation',
                course: 'Course Evaluation',
              })
            }, 2000)
          })
    }
    ngOnInit(){
        console.log(this.router);
        
        let self = this;
        swal({
            title: 'Select Evaluation Type',
            input: 'radio',
            inputOptions: this.inputOptions,
            inputValidator: function (result): Promise<void> {
                return new Promise<void>(function (resolve, reject) {
                  if (result) {
                    resolve()
                  } else {
                    reject('You need to select something!')
                  }
                })
              }
          }).then(function (result) {
            console.log(self.router);
            let surveyMetaData = JSON.parse(localStorage.getItem('surveyMetaData'));
            surveyMetaData.evaluation = result;
            localStorage.setItem('surveyMetaData', JSON.stringify(surveyMetaData));
            console.log(surveyMetaData);
            
            self.router.navigate(['survey']);
          })
    }
}