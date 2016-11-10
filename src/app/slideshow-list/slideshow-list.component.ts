import { SlideshowsService } from './../slideshows.service';
import { Slideshow } from './../_model/Slideshow';
import { Component, OnInit, Input } from '@angular/core';

import {
	AngularFire,
	FirebaseObjectObservable,
	FirebaseListObservable,
	AuthProviders,
	FirebaseApp
} from 'angularfire2'

@Component({
	selector: 'app-slideshow-list',
	templateUrl: './slideshow-list.component.html',
	styleUrls: ['./slideshow-list.component.css']
})
export class SlideshowListComponent implements OnInit {

	@Input()
	slideshows: FirebaseListObservable<any>;
	selectedSlideshow:Slideshow
	slides : FirebaseListObservable<any>


	constructor( private slideshowsService: SlideshowsService,
				 private _af: AngularFire) { }


	/**
	 * Set Selected Slideshow as current
	 */
	onSelect( slideshow:Slideshow ) {
		
		this.selectedSlideshow = slideshow	
		console.log(slideshow.$key)
		console.log('type?', typeof(slideshow) )
		//this.slides = this.slideshowsService.getSlideshow(slideshow)	
		this.slideshowsService.selectedSlideshow = slideshow;
	}

	/**
	 * Add Slideshow Item to Slideshows Collection
	 */
	createSlideshow(name: string) {
		name = name.trim()
		if (!name) { return }
		let slideshow = new Slideshow()
		slideshow.index = 0
		slideshow.name = name
		this.slideshows.push(slideshow)
		console.info('Slideshow :', slideshow)
	}
	/**
	 * BEHAVE !
	 */
	deleteAllSlideshows() {
		this.slideshows.remove()
	}
	ngOnInit() {
	}

}
