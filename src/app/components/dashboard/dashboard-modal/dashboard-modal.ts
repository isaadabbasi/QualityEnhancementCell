// import { Router } from '@angular/router';
// import { SharedService } from './../../../shared/shared.service';
// import { TEACHER_BASE_URL, ADD_SURVEY_URL, DOWNLOAD_EXCEL } from './../../../shared/global-vars';
// import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';


// @Component({
//     selector: 'dashoard-modal',
//     template: ``
// })
// export class DashboardModalComponent implements OnInit {
//     @Input() modalPurpose: string = '';
//     @Input() idtoDelete: string = '';
//     @Input() surveyDetails = null;
//     @Output() modalStatus: EventEmitter<Boolean> = new EventEmitter<Boolean>();

//     constructor(private router: Router, 
//                 private sharedService: SharedService) {
//     }
//     ngOnInit(){
//         this.modalPurpose = this.modalPurpose.toLowerCase();
//         if(this.modalPurpose === 'evaluation'){
//           this.generateEvaluationModal();
//         }else if(this.modalPurpose == 'delete'){
//           this.generateDeleteModal(this.idtoDelete);
//         }else if(this.modalPurpose == 'add'){
//           this.generateAddModal();
//         }else if(this.modalPurpose === 'confirm'){
//           this.generateConfirmModal();
//         }else if(this.modalPurpose === 'survey'){
//           this.generateExcelModal();
//         }
        
        

//     }
//     generateEvaluationModal(){
//       let inputOptions;
//       inputOptions = new Promise(function (resolve) {
//         setTimeout(function () {
//           resolve({
//             teacher: 'Teacher Evaluation',
//             course: 'Course Evaluation',
//           })
//         }, 500)
//       })
//       let self = this;
//       swal({
//           title: 'Select Evaluation Type',
//           input: 'radio',
//           inputOptions: inputOptions,
//           inputValidator: function (value) {
//             return !value && 'You need to choose something!'
//           },
//             allowEscapeKey: true
//         }).then(function (result) {
//           let surveyMetaData = JSON.parse(localStorage.getItem('surveyMetaData'));
//           surveyMetaData.evaluation = result.value;
//           localStorage.setItem('surveyMetaData', JSON.stringify(surveyMetaData));
//           self.router.navigate(['survey']);
//         })
//     }
//     generateDeleteModal(deleteThis){
//       let self = this;
      
//       swal({
//         title: 'Are you sure?',
//         text: "You won't be able to revert this!",
//         type: 'warning',
//         showCancelButton: true,
//         confirmButtonColor: '#3085d6',
//         cancelButtonColor: '#d33',
//         confirmButtonText: 'Yes, delete it!'
//       }).then(function () {
//         self.sharedService.deleteCall(`${TEACHER_BASE_URL}/${deleteThis}`)
//           .subscribe(
//             next => {
//               swal(
//                 'Deleted!',
//                 'Teacher deleted successfully.',
//                 'success'
//               ).then( () => {
//                 self.modalStatus.emit(false);
//               }).catch( err => {
//                 self.modalStatus.emit(false);
//               } )
//             },
//             err => console.log(err),
//             () => {}
//           );        
//       }).catch( err => {
//         console.log(err);
//         self.modalStatus.emit(false);
//       })
//     }
//     generateAddModal(){
//       let self = this;
//       swal.setDefaults({
//         input: 'text',
//         confirmButtonText: 'Next &rarr;',
//         showCancelButton: true,
//         progressSteps: ['1', '2', '3', '4']
//       })
      
//       var steps = [
//         'Fullname',
//         'Designation',
//         'Subjects',
//         'Departments'
//       ];
      
//       swal.queue(steps).then(function (result) {
//         swal.resetDefaults()
//         let teacher = {
//           fullname: result[0],
//           designation: result[1],
//           subjects: result[2].split(','),
//           departments: result[3].split(',')
//         }
//         self.sharedService.postCall(`${TEACHER_BASE_URL}/add`, teacher)
//           .subscribe(
//             next => {
//               swal(
//                 'Added!',
//                 'Teaccher added successfully.',
//                 'success'
//               ).then( () => {
//                 self.modalStatus.emit(false);
//               }).catch( err => {
//                 console.log(err);
//                 self.modalStatus.emit(false);
//               })
//             },
//             err => console.log(err),
//             () => {}
//           )
//           }, function () {  
//             swal.resetDefaults()
//           }).catch( () => self.modalStatus.emit(false))
//     }
//     generateConfirmModal(): any {
//       let self = this;
//       swal({
//         title: 'Are you sure?',
//         text: "You won't be able to revert or edit this!",
//         type: 'warning',
//         showCancelButton: true,
//         confirmButtonColor: '#3085d6',
//         cancelButtonColor: '#d33',
//         confirmButtonText: 'Yes!',
//         cancelButtonText: 'Let me recheck.'
//       }).then(function (result) {
//         console.log(result)
//         if(result.dismiss != 'cancel'){
//         self.sharedService.postCall(ADD_SURVEY_URL, self.surveyDetails)
//           .subscribe(
//             next => {
//               swal(
//                 'Submitted!',
//                 'Survey submitted successfully.',
//                 'success'
//               ).then( () => {
//                 self.modalStatus.emit(false);
//                 self.router.navigate(['/']); 
//                 localStorage.setItem('surveysAdded', JSON.stringify([
//                   {
//                     teacher: self.surveyDetails.teacher,
//                     course: self.surveyDetails.course,
//                     evaluation: self.surveyDetails.evaluation
//                   }
//                 ]));
//               }).catch( err => {
//                 console.log(err);
//                 self.router.navigate(['/']); 
//                 self.modalStatus.emit(false);
//               } )
//             },
//             err => {console.log(err), self.modalStatus.emit(false);}
//           );
//         }else
//           self.modalStatus.emit(false);
//       }).catch( err => {
//         console.log(err);
//         self.modalStatus.emit(false);
//       })
//     }
//     generateExcelModal():any {
//       let self = this;
//       swal.setDefaults({
//         input: 'text',
//         confirmButtonText: 'Next &rarr;',
//         showCancelButton: true,
//         progressSteps: ['1', '2']
//       });
//       let steps = [
//         'Enter batch (optional)', 
//         'Enter subject (optional)'
//       ]
//       swal.queue(steps)
//         .then(result => {
//           console.log(result)
//           if(result.value){
            
//             swal.resetDefaults();
//             let details = {
//               batch: result.value[0] || '',
//               subject: result.value[1] || ''
//             }
//             swal({
//               title: 'Please confirm',
//               html: 
//                 'Download excel for ' + self.surveyDetails.teacher +
//                 ' from department ' + self.surveyDetails.dept + 
//                 (result.value[0] ? ', batch ' + result.value[0] : '') +
//                 (result.value[1] ? ' and subject ' + result.value[1]: ''),
//                 confirmButtonText: 'Yes! Let me download.',
//                 showCancelButton: true,
//                 cancelButtonText: 'No! Let me edit.',
//                 confirmButtonColor: '#3085d6',
//                 cancelButtonColor: '#d33',
//             }).then(
//               result => {
//                 if(result.dismiss != 'cancel' && result.dismiss != 'overlay' && result.dismiss != 'esc'){
//                     let batch = !!details.batch ? `&batch=${details.batch}` : '',
//                       subject = !!details.subject ? `&subject=${details.subject}`: '',
//                       URL     = `${DOWNLOAD_EXCEL}?teacher=${self.surveyDetails.teacher}&dept=${self.surveyDetails.dept}${batch}${subject}`;  
//                       console.log(URL);
//                     window.open(URL, '__blank');        
//                       self.modalStatus.emit(false);
//                     }else
//                       self.modalStatus.emit(false);
//               }
//             ).catch( err => {
//                 console.log(err);
//                 self.modalStatus.emit(false);
//               })
//           }
//         }).catch( err => {
//             console.log(err);
//             self.modalStatus.emit(false);
//           });
//     }
// }