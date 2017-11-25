import { TEACHER_DETAILS_URL } from './../../../shared/global-vars';
import { SharedService } from './../../../shared/shared.service';
import { Component } from '@angular/core';
@Component({
    selector: 'settings',
    templateUrl: './settings.html'
})
export class SettingsComponent {
    allTeachers: Array<Object>;
    constructor(private sharedService: SharedService) {
        
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
    addTeacher(action){
        this.openModal = true;
        this.purpose = action;
    }
}