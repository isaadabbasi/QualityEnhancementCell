import { TEACHER_DETAILS_URL, Departments as DepartmentsList, TEACHER_BASE_URL } from './../../../shared/global-vars';
import { SharedService } from './../../../shared/shared.service';
import { Component, ComponentFactoryResolver, ViewContainerRef, ViewChild } from '@angular/core';
import { ModalComponent } from '../../../modal/modal.component';
@Component({
    selector: 'settings',
    templateUrl: './settings.html'
})
export class SettingsComponent {

    @ViewChild('modal', {read: ViewContainerRef}) container: ViewContainerRef;
    

    allTeachers: Array<Object>;
    constructor(private sharedService: SharedService,
                private _cfr: ComponentFactoryResolver
    ) {
        
    }
    ngOnInit(){
        
    }
    getTeachers(){
        this.sharedService.getCall(TEACHER_DETAILS_URL)
        .subscribe(
            next => {
                this.allTeachers = next["body"];
            }
        ),
        err => console.error(err),
        () => console.error(this.allTeachers)
        
    }
    topMenu = [
        'Admin',
        'Teacher',
        'Survey',
        'Student'
    ]
    openModal;
    idToDelete;
    purpose;
    openConfirmation(action, id){
        this.openModal = true;
        this.purpose = action;
        this.idToDelete = id;
    }
    modalState(value) {
        this.openModal = value;
        if(!value){
            this.getTeachers();
            // setTimeout()
        }
    }
    addTeacher(){
        let modalOptions = {
            metaData: {
              chaining: false,
              labels: false,
              setOnTop: true
            },
            header: 'Add new teacher',
            body: [{
                    type: 'text',
                    label: 'Full name',
                    placeholder: 'Full name',
                    id: 'fullname'
                },{
                    type: 'text',
                    label: 'Designation',
                    placeholder: 'Designation',
                    id: 'designation'
                },{
                    type: 'text',
                    label: 'Subjects',
                    placeholder: 'Subjects',
                    id: 'subjects'
                },{
                    type: 'text',
                    label: 'Departments',
                    placeholder: 'Departments',
                    id: 'departments'
                }
            ],
            footer: [{
                    type: 'button',
                    label: 'Submit',
                    id: 'submit',
                    icon: 'fa fa-check'
                },{
                    type: 'button',
                    label: 'Cancel',
                    id: 'cancel',
                    icon: 'fa fa-times'
                }
            ]
          };
          this.container.clear();
          // check and resolve the component
          let comp = this._cfr.resolveComponentFactory(ModalComponent);
          // Create component inside container
          let modalComponent = this.container.createComponent(comp);
          
          modalComponent.instance["_ref"] = modalComponent;
          modalComponent.instance.options = modalOptions;
          
          
          modalComponent.instance.output
            .subscribe( output => {
                if(output.get('status') != 'cancel'){
                    let teacher = {
                        fullname: output.get('fullname'),
                        designation: output.get('designation'),
                        subjects: output.get('subjects').split(','),
                        departments: output.get('departments').split(',')  
                    }
                    this.sendTeacherDetails(`${TEACHER_BASE_URL}/add`, teacher)
                }
          });
    }
    sendTeacherDetails(URL, teacher){
        this.sharedService.postCall(URL, teacher)
            .subscribe(
                console.log
            ),
            console.error
    }
}