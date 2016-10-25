import { Component } from '@angular/core';
import {AngularFire,FirebaseObjectObservable} from 'angularfire2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  af: AngularFire;localStorage

  item: FirebaseObjectObservable<any>;

  constructor(af: AngularFire) {
    this.af =  af ;
    this.item = af.database.object('/item');
  }

  login() {
      this.af.auth.login();
    }

  logout() {
     this.af.auth.logout();
  }
}
