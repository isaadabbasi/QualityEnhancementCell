import { Component, OnInit } from '@angular/core';
// import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
    // _root: FirebaseObjectObservable <any> = null;
    // persons: FirebaseObjectObservable<any> = null;
    // item: FirebaseObjectObservable<any>;
    title = 'app works!';

    // constructor(public af: AngularFire) {
      // this.item = af.database.object('/persons/');
    // }

    // save(newName: string) {
    //   this.item.set({ phone: newName });
    // }

    // update(newSize: string) {
    //   this.item.update({ address: newSize });
    // }

    ngOnInit(){
      console.log('On Init Initialized')
      let users: Array<Object> = [
        {username: 'saadabbasi', password: 'abcd1234'},
        {username: 'smtaha', password: 'abc123'},
        {username: 'fahadiqbal', password: 'duet123'}
      ]
      
      localStorage.setItem('users', JSON.stringify(users));
    }

}
