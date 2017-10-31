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
        console.log('Trying to get teachers.')
        this.allTeachers = [];
        this.sharedService.getCall(TEACHER_DETAILS_URL)
        .subscribe(
            next => {
                console.log(next);
                this.allTeachers = next["body"];
                console.log(this.allTeachers);
                
            }
        ),
        err => console.log(err),
        () => console.log(this.allTeachers)
        
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
        console.log(action, id);
        this.purpose = action;
        this.idToDelete = id;
        console.log(this.idToDelete);
    }
    modalState(value) {
        this.openModal = value;
        if(!value){
            console.log(value);
            this.getTeachers();
            // setTimeout()
        }
    }
    addTeacher(action){
        this.openModal = true;
        this.purpose = action;
    }
}