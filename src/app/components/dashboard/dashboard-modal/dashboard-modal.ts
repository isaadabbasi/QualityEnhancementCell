import { Router } from '@angular/router';
import { SharedService } from './../../../shared/shared.service';
import { TEACHER_BASE_URL } from './../../../shared/global-vars';
import { Http } from '@angular/http';
import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import swal from "sweetalert2";

@Component({
    selector: 'dashoard-modal',
    template: ``
})
export class DashboardModalComponent implements OnInit {
    @Input() modalPurpose: string = '';
    @Input() idtoDelete: string = '';
    @Output() modalStatus: EventEmitter<Boolean> = new EventEmitter<Boolean>();
    inputOptions;
    constructor(private router: Router, 
                private sharedService: SharedService) {
        console.log(this.idtoDelete);
    }
    ngOnInit(){
        if(this.modalPurpose.toLocaleLowerCase() === 'evaluation'){
          this.generateEvaluationModal();
        }else if(this.modalPurpose.toLocaleLowerCase() == 'delete'){
          this.generateDeleteModal(this.idtoDelete);
          console.log(this.idtoDelete);
        }else if(this.modalPurpose.toLocaleLowerCase() == 'add'){
          this.generateAddModal();
        }
        
        

    }
    generateEvaluationModal(){
      this.inputOptions = new Promise(function (resolve) {
        setTimeout(function () {
          resolve({
            teacher: 'Teacher Evaluation',
            course: 'Course Evaluation',
          })
        }, 500)
      })
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
                  this.openModal = false;
                  reject('You need to select something!');

                }
              })
            },
            allowEscapeKey: true
        }).then(function (result) {
          console.log(self.router);
          let surveyMetaData = JSON.parse(localStorage.getItem('surveyMetaData'));
          surveyMetaData.evaluation = result;
          localStorage.setItem('surveyMetaData', JSON.stringify(surveyMetaData));
          console.log(surveyMetaData);
          
          self.router.navigate(['survey']);
        })
    }
    generateDeleteModal(deleteThis){
      let self = this;
      
      swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(function () {
        
        console.log(TEACHER_BASE_URL + '/' +  deleteThis);
        self.sharedService.deleteCall(`${TEACHER_BASE_URL}/${deleteThis}`)
          .subscribe(
            next => {
              console.log(next)
              swal(
                'Deleted!',
                'Teacher deleted successfully.',
                'success'
              ).then( () => {
                self.modalStatus.emit(false);
              }).catch( err => {
                console.log(err);
                self.modalStatus.emit(false);
              } )
            },
            err => console.log(err),
            () => {}
          );        
      }).catch( err => {
        console.log(err);
        self.modalStatus.emit(false);
      })
    }
    generateAddModal(){
      let self = this;
      swal.setDefaults({
        input: 'text',
        confirmButtonText: 'Next &rarr;',
        showCancelButton: true,
        progressSteps: ['1', '2', '3', '4']
      })
      
      var steps = [
        'Fullname',
        'Designation',
        'Subjects',
        'Departments'
      ];
      
      swal.queue(steps).then(function (result) {
        swal.resetDefaults()
        console.log(result);
        let teacher = {
          fullname: result[0],
          designation: result[1],
          subjects: result[2].split(','),
          departments: result[3].split(',')
        }
        console.log(teacher);
        self.sharedService.postCall(`${TEACHER_BASE_URL}/add`, teacher)
          .subscribe(
            next => {
              console.log(next);
              swal(
                'Added!',
                'Teaccher added successfully.',
                'success'
              ).then( () => {
                self.modalStatus.emit(false);
              }).catch( err => {
                console.log(err);
                self.modalStatus.emit(false);
              })
            },
            err => console.log(err),
            () => {}
          )
          }, function () {  
            swal.resetDefaults()
          })
    }
}