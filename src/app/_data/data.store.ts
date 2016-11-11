import { SlideshowsService } from './slideshows.service';
import { Slideshow } from './types/Slideshow';
import { Slide } from './types/Slide';

import { SlidesService } from './slides.service';
import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs/Rx";
import {
	AngularFire,
	FirebaseObjectObservable,
	FirebaseListObservable,
	AuthProviders,
	FirebaseApp
} from 'angularfire2'

@Injectable()
export class DataStore {

	slideshows:BehaviorSubject<FirebaseListObservable<Slideshow[]>>
	slides:BehaviorSubject<FirebaseListObservable<Slideshow[]>>
	selectedSlideshow:BehaviorSubject<Slideshow>
	selectedSlideshowSlides:BehaviorSubject<FirebaseListObservable<Slide[]>>

	constructor( private slideshowsService:SlideshowsService,  private slidesService:SlidesService ) {
		this.slideshows =  new BehaviorSubject(<FirebaseListObservable<Slideshow[]>> );
		this.readSlideshows()
	}

	createSlideshow( slideshow:Slideshow ) {

	}

	readSlideshows() { 
		this.slideshows.next( this.slideshowsService.readSlideshows() );	
	}

	updateSlideshow( slideshow:Slideshow ) {

	}

	deleteSlideshow( slideshow:Slideshow ) {

	}

	selectSlideshow( slideshow:Slideshow ) {

	}
//-
	createSlide( slideshow:Slideshow , name:string) {
		if (!name) { return }
	}

	readSlides() { 
		this.slideshows.next( this.slideshowsService.readSlideshows() );	
	}

	updateSlide( slideshow:Slideshow ) {

	}

	deleteSlide( slideshow:Slideshow ) {

	}

}