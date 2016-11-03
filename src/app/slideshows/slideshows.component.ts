import { Slideshow } from './../_model/Slideshow';
import { Component, Inject, NgZone, OnInit } from '@angular/core';
import {
	AngularFire,
	FirebaseObjectObservable,
	FirebaseListObservable,
	AuthProviders,
	FirebaseApp
} from 'angularfire2';

@Component({
	selector: 'app-slideshows',
	templateUrl: './slideshows.component.html',
	styleUrls: ['./slideshows.component.css']
})
export class SlideshowsComponent implements OnInit {

	_zone;
	_firebaseApp;
	slideshows: FirebaseListObservable<any>;
	slides: FirebaseListObservable<any>;
	selectedSlideshow:Slideshow;

	onSelect( slideshow:Slideshow ) {
		console.log(slideshow);
		this.selectedSlideshow = slideshow;
	}

	createSlideshow( name: string ) {
			name = name.trim();
			if (!name) { return; }
			console.info('Slideshow Name:' , name);
			let slideshow = new Slideshow(null);
					slideshow.index=0;
					slideshow.name=name;
			this.slideshows.push(slideshow);
	}

	createSlide(name: string) {
			name = name.trim();
			let selectedSlideshowKey = this.selectedSlideshow.$key;
			if (!name) { return; }

			console.info('Slide Name:' , name);
			console.info('selected key' , this.selectedSlideshow.$key);

			this._af.database.list('/slideshows/'+this.selectedSlideshow.$key+'/slides').push({
			  name:name
			});


	}

	deleteAll() {
		this.slideshows.remove();
	}

	constructor( private _af: AngularFire, @Inject(FirebaseApp) _firebaseApp: any, _zone:NgZone) {
		this._zone = _zone;
		this._firebaseApp = _firebaseApp;
		this.slideshows = this._af.database.list('/slideshows', {});
	}

	ngOnInit() {}
}
