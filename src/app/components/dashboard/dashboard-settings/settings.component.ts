import { Component } from '@angular/core';
@Component({
    selector: 'settings',
    templateUrl: './settings.html'
})
export class SettingsComponent {
    constructor() {
        
    }
    crudOperations = [
        'Create',
        'Read',
        'Update',
        'Delete'
    ]
}