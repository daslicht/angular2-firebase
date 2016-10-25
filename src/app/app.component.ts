import { Component } from '@angular/core';
import {AngularFire, FirebaseListObservable,FirebaseObjectObservable} from 'angularfire2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  
  title = 'app works!';
  
  items: FirebaseListObservable<any[]>;

  item: FirebaseObjectObservable<any>;

  constructor(af: AngularFire) {
    this.items = af.database.list('/items');
    this.item = af.database.object('/item');
  }

}
