import { Slideshow } from './../_model/Slideshow';
import { Component, Inject, NgZone, OnInit } from '@angular/core';
import {
	AngularFire,
	FirebaseObjectObservable,
	FirebaseListObservable,
	AuthProviders,
	FirebaseApp
} from 'angularfire2';
import { Subject } from 'rxjs/Subject';

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
	selectedSlideKeySubject: Subject<any>;

	onSelect( slideshow:Slideshow ) {
		console.log(slideshow);
		this.selectedSlideshow = slideshow;
		this.selectedSlideKeySubject.next( this.selectedSlideshow.$key );
	}

	createSlideshow( name: string ) {
			name = name.trim();
			if (!name) { return; }
			console.info('Slideshow Name:' , name);
			let slideshow = new Slideshow();
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

			// ADD SLIDE TO SLIDESHOW inline WORKING!
			// this._af.database.list('/slideshows/'+this.selectedSlideshow.$key).push({
			//   name:name
			// });

			this._af.database.list('/slides/').push({
				slideshowKey: this.selectedSlideshow.$key,
				name:name
			})

			// .then((snapshot)=>{
			//   	console.log("snapshot: ",snapshot);
			// });
				// key.subscribe(queriedItems => {
				// 	console.log("queriedItems: ",queriedItems);
				// });

			/*
					firebase.database().ref('/users'+'/'+'-KV_qMVWLtUCxmNZ7zka').push({
					ref: userId,
					username: name,
					email: email,
					profile_picture : imageUrl
				});
			}*/
			// let key = this._firebaseApp.ref('/slideshows/' + this.selectedSlideshow.$key + '/' + name);
			// key.on('value', function(snapshot) {
			//     console.log('snapshot val:',snapshot.val());
			// });

			//let slides = this._af.database.list('/slides'+this.selectedSlideshow.$key, {});
			//let storageRef = this._firebaseApp.ref('/slides'+this.selectedSlideshow.$key);
			 //   storageRef.push({test:"toast"});

		 // var newPostKey = firebase.database().ref().child('posts').push().key;

	}

			// this.selectedSlideshow.slides.push({
			//   name: name
			// });

	deleteAll() {
		this.slideshows.remove();
		this.slides.remove();
	}

	constructor( private _af: AngularFire, @Inject(FirebaseApp) _firebaseApp: any, _zone:NgZone) {
		this._zone = _zone;
		this._firebaseApp = _firebaseApp;


		this.slideshows = this._af.database.list('/slideshows', {});
		this.selectedSlideKeySubject = new Subject();
		this.slides = this._af.database.list('/slides', {
			query: {
				orderByChild: 'slideshowKey',
				equalTo: this.selectedSlideKeySubject
			}
		});
		this.slides.subscribe( queriedItems => {
				console.log('slides.subscribe change',queriedItems);
		});

	}

	ngOnInit() {}
}
