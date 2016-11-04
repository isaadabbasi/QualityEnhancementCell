import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
    _root: FirebaseObjectObservable <any> = null;
    persons: FirebaseObjectObservable<any> = null;
    item: FirebaseObjectObservable<any>;
    title = 'app works!';

    constructor(public af: AngularFire) {
      this.item = af.database.object('/persons/');
    }

    save(newName: string) {
      this.item.set({ phone: newName });
    }

    update(newSize: string) {
      this.item.update({ address: newSize });
    }

    ngOnInit(){}

}
