import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class FirebaseRestService {

  private firebaseURL = 'https://test-fad8a.firebaseio.com';
  
  constructor( private http:Http ) {}

  setUser(firstName: string, lastName: string) {
    
    const body = JSON.stringify({firstName: firstName, lastName: lastName});
    
    return this.http.put(this.firebaseURL + '/user.json' ,body)
      .map(response => response.json() )
}

  getUser() {
    return this.http.get(this.firebaseURL+'/user.json')
      .map(response => response.json() )
  }

}
