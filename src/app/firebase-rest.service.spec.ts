/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FirebaseRestService } from './firebase-rest.service';

describe('Service: FirebaseRest', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FirebaseRestService]
    });
  });

  it('should ...', inject([FirebaseRestService], (service: FirebaseRestService) => {
    expect(service).toBeTruthy();
  }));
});
