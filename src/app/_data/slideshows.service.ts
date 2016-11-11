import { Observable } from 'rxjs/Observable';
import { Slideshow } from './types/Slideshow';
import { Slide } from './types/Slide';
import { Injectable } from '@angular/core';

import {
	AngularFire,
	FirebaseObjectObservable,
	FirebaseListObservable,
	AuthProviders,
	FirebaseApp
} from 'angularfire2'

@Injectable()
export class SlideshowsService {


	constructor(private _af: AngularFire) { }


	createSlideshow( slideshow:Slideshow, name:string) {

	}

	readSlideshows(): FirebaseListObservable<Slideshow[]> {
		return  this._af.database.list('/slideshows', {}) as FirebaseListObservable<Slideshow[]>
	}
	
	updateSlideshow(  slideshow:Slideshow ){

	}

	deleteSlideshow(  slideshow:Slideshow ) {

	}

}
