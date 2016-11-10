import { Slideshow } from './_model/Slideshow';
import { Slide } from './_model/Slide';
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

    private _selectedSlideshow:Slideshow
	private _slideshows:FirebaseListObservable<Slideshow[]>
	selectedSlideshowSlides:FirebaseListObservable<Slide[]>

	// private _setSelectedSlideshowSlides(slideshow:Slideshow) {
	// 	this._selectedSlideshowSlides = this._af.database.list('/slideshows/'+slideshow.$key+'/slides',{})
	// 	console.log('this._selectedSlideshowSlides', this._selectedSlideshowSlides)
	// }

	// get selectedSlideshowSlides():FirebaseListObservable<Slide[]> {
	// 	return this._selectedSlideshowSlides;
	// }

	get slideshows():FirebaseListObservable<Slideshow[]> {	
		this._slideshows =  this._af.database.list('/slideshows', {}) as FirebaseListObservable<Slideshow[]>
		return this._slideshows
	}

	set selectedSlideshow(slideshow:Slideshow) {
		console.log('set selected Slideshow', slideshow)
		this._selectedSlideshow = slideshow
		this.selectedSlideshowSlides = this._af.database.list('/slideshows/'+slideshow.$key+'/slides',{})
		console.log('set selected Slideshow selectedSlideshowSlides', this.selectedSlideshowSlides)
		//this._setSelectedSlideshowSlides(slideshow)
	}

	get selectedSlideshow():Slideshow {
		return this._selectedSlideshow
	}

	constructor(private _af: AngularFire) { }

}
