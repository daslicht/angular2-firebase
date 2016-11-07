import { Slideshow } from './../_model/Slideshow';
import { Slide } from './../_model/Slide';
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
	slideshows : FirebaseListObservable<any>;
	slides : FirebaseListObservable<any>;
	selectedSlideshow: Slideshow;

	generateArray( obj:any ) {
		return Object.keys(obj).map((key)=>{ return obj[key]});
	}

	onSelect( slideshow:Slideshow ) {
		console.log(slideshow.$key);
		this.slides = this._af.database.list('/slideshows/'+slideshow.$key+'/slides',{});
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

	addImage() {

	}
	deleteAll() {
		this.slideshows.remove();
	}
	updateItem( key:string, name:string ) {
		console.log('key slide', key);
		let _slide = new Slide();
			_slide.name = name;

		// slide.name = name;
		// console.log('slide', JSON.stringify(slide) )
		 this.slides.update(key, {name:name});
	}
	deleteItem( key:string ) {
		//delete Image
		//delete slide
		this.slides.remove(key);
	}
	constructor( private _af: AngularFire, @Inject(FirebaseApp) _firebaseApp: any, _zone:NgZone) {
		this._zone = _zone;
		this._firebaseApp = _firebaseApp;
		this.slideshows = this._af.database.list('/slideshows', {});
		const messaging = _firebaseApp.messaging();

		messaging.requestPermission()
			.then(function() {
				console.log('Notification permission granted.');
			// TODO(developer): Retrieve an Instance ID token for use with FCM.
			// ...
			})
			.catch(function(err) {
				console.log('Unable to get permission to notify.', err);
			});
		// this.slideshows.subscribe(snapshots => {
		// 	console.log('length: ',snapshots.length);
		// })
		// console.log(this.slideshows);
		// this.slideshows.subscribe(snapshots => {
		// 	console.log(snapshots.length);
		// 	// snapshots.forEach(snapshot => {

		// 	// 	console.log('snapshot: ' , snapshot );
		// 	// 	// console.log('snapshot.key' , snapshot.key );
		// 	// 	// console.log('snapshot.vla:' , snapshot.val() );
		// 	// });
		// })

	}

	ngOnInit() {}
}
