import { Component } from '@angular/core';
import { FirebaseRestService } from './firebase-rest.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[FirebaseRestService]
})

export class AppComponent {

  response:string;
  
  constructor(private firebaseService: FirebaseRestService, ) {

  }

  setUser() {
    this.firebaseService.setUser("foo", "bar").subscribe(
      user => this.response = JSON.stringify(user),
      error => console.log(error)
    );
  }

  getUser(){
    this.firebaseService.getUser().subscribe(
      user => this.response = JSON.stringify(user),
      error => console.log(error)
    );
  }


}
