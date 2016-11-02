/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SlideshowsService } from './slideshows.service';

describe('Service: Slideshows', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SlideshowsService]
    });
  });

  it('should ...', inject([SlideshowsService], (service: SlideshowsService) => {
    expect(service).toBeTruthy();
  }));
});
