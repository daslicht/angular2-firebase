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

	slideshows:FirebaseListObservable<Slideshow[]>
	slides:FirebaseListObservable<Slideshow[]>
	selectedSlideshow:BehaviorSubject<Slideshow> 
	//selectedSlideshow:FirebaseObjectObservable<Slideshow>
	private selectedSlideshowSlides:FirebaseListObservable<Slide[]>

	constructor( private slideshowsService:SlideshowsService,  private slidesService:SlidesService ) {
		this.readSlideshows()
		this.selectedSlideshow = new BehaviorSubject('');
		this.slideshows.subscribe( (data) => {
			console.log(data)
			//this.selectedSlideshow = data[0] as FirebaseObjectObservable<Slideshow>
			this.selectedSlideshow.next( data[0] )
		})
		// this.selectedSlideshow = new BehaviorSubject(null);
		this.selectedSlideshow.subscribe( (snapshot)=> {
			console.log('selectedSlideshow changed: ', snapshot )
		})
	}

	createSlideshow( slideshow:Slideshow ) {

	}

	readSlideshows() { 
		this.slideshows = this.slideshowsService.readSlideshows();	
	}

	updateSlideshow( slideshow:Slideshow ) {

	}

	deleteSlideshow( slideshow:Slideshow ) {

	}

	selectSlideshow( slideshow:Slideshow ) {
		//this.selectedSlideshow.next(slideshow )
		this.selectedSlideshow.next(slideshow)   //as FirebaseObjectObservable<Slideshow>
	}
//-
	createSlide( slideshow:Slideshow , name:string) {
		if (!name) { return }
	}

	readSlides() { 
		return this.slideshowsService.readSlideshows() 	
	}

	updateSlide( slideshow:Slideshow ) {

	}

	deleteSlide( slideshow:Slideshow ) {

	}

}