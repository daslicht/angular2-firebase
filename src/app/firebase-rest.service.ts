import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class FirebaseRestService {

  constructor( private http:Http ) {}

  setUser(firstName: string, lastName: string) {
    const body = JSON.stringify({firstName: firstName, lastName: lastName});
    return this.http.put
}

  getUser() {

  }

}
