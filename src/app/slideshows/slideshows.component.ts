import { SlideshowsService } from './../slideshows.service';
import { ImageHelper, VO } from './ImageHelper'
import { Slideshow } from './../_model/Slideshow'
import { Slide } from './../_model/Slide'
import { Component, Inject, NgZone, OnInit } from '@angular/core'


import {
	AngularFire,
	FirebaseObjectObservable,
	FirebaseListObservable,
	AuthProviders,
	FirebaseApp
} from 'angularfire2'

import * as firebase from 'firebase'

@Component({
	selector: 'app-slideshows',
	templateUrl: './slideshows.component.html',
	styleUrls: ['./slideshows.component.scss'],
	providers:[SlideshowsService]
})

export class SlideshowsComponent implements OnInit {

	_zone
	//_firebaseApp
	slideshows : FirebaseListObservable<Slideshow[]>
	selectedSlideshow: Slideshow
	selectedSlideshowSlides: FirebaseListObservable<Slide[]>
	// slides : FirebaseListObservable<any>
	// selectedSlideshow:Slideshow
	// imageHelper:ImageHelper
	// full_image:string
    // currentSlide:Slide;


	_getSlideshows() {
		this.slideshows =  this.slideshowsService.slideshows;
		this.selectedSlideshow =  this.slideshowsService.selectedSlideshow;
		console.log('this.slideshowsService.slideshows :', this.slideshowsService.slideshows);
	} 


	/**
	 * Constructor
	 * see: https://angular.io/docs/ts/latest/tutorial/toh-pt4.html
	 */
	constructor(private slideshowsService: SlideshowsService,  
				@Inject(FirebaseApp) _firebaseApp: firebase.app.App,) {

		console.log('slideshowsService:::',)

	}

	ngOnInit() {
		this.slideshows =  this.slideshowsService.slideshows;
		this.selectedSlideshow =  this.slideshowsService.selectedSlideshow;
		this.selectedSlideshowSlides = this.slideshowsService.selectedSlideshowSlides;

		//this._getSlideshows();
	}
}
