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
	styleUrls: ['./slideshows.component.scss']
})

export class SlideshowsComponent implements OnInit {

	_zone
	_firebaseApp
	slideshows : FirebaseListObservable<any>
	slides : FirebaseListObservable<any>
	selectedSlideshow:Slideshow
	imageHelper:ImageHelper
	full_image:string
    currentSlide:Slide;

    private _messaging: firebase.messaging.Messaging

	/**
	 * Set Selected Slideshow as current
	 */
	onSelect( slideshow:Slideshow ) {
		

		this.selectedSlideshow = slideshow	
		console.log(slideshow.$key)
		console.log('type?', typeof(slideshow) )
		this.slides = this._af.database.list('/slideshows/'+slideshow.$key+'/slides',{})
	}

	/**
	 * Add Slideshow Item to Slideshows Collection
	 */
	createSlideshow( name: string ) {
		name = name.trim()
		if (!name) { return }
		let slideshow = new Slideshow()
			slideshow.index=0
			slideshow.name=name
		this.slideshows.push(slideshow)
		console.info('Slideshow :' , slideshow)
	}

	/**
	 * Add Slide Item to Slides Collection
	 */
	createSlide(name: string) {
		name = name.trim()
		let selectedSlideshowKey = this.selectedSlideshow.$key
		if (!name) { return }
		let slide = new Slide()
			slide.name = name
			slide.preview='https://placeholdit.imgix.net/~text?txtsize=9&txt=100×100&w=100&h=100'
		console.info('Slide Name:' , name)
		console.info('selected key' , this.selectedSlideshow.$key)
		this._af.database.list('/slideshows/'+this.selectedSlideshow.$key+'/slides').push(slide)
	}

	/**
	 * Add Image to Slide Item
	 */
	private addImageToSlide(event) {
		
		let d = new Date()
		let time = d.getTime()
		
		let storageRef = this._firebaseApp.storage().ref().child('images/'+time+'.png')
		console.log('key',this.currentSlide.$key)
		console.log("storageRef",storageRef)

		
		let files = event.target.files
		let file = files[0] 

		this.imageHelper.resizeWithCanvas(file).then((vo:VO)=>{
			console.log("VO:",vo)
			this.currentSlide.url = vo.preview
			storageRef.put(file).then( (snapshot) => {
				console.log('Uploaded a blob or file!',snapshot)
				console.log(snapshot.a.downloadURLs[0])

				let _slide = new Slide()
					_slide.path = storageRef.a.path
					_slide.url = snapshot.a.downloadURLs[0]
					_slide.preview = vo.preview
					
				this.slides.update(this.currentSlide.$key, _slide )
			})
		})
	}

	/**
	 * Open File Dialog 
	 */
	openFileDialog( slide:Slide ) {
		this.currentSlide = slide;
		let fileInput = document.createElement('input');
			fileInput.type = "file";
			fileInput.addEventListener('change', (event)=>{
				console.log('change!: ', event);
				this.addImageToSlide(event)
			});
		fileInput.click();
	
		console.log(this.currentSlide);
	}

	/**
	 * BEHAVE !
	 */
	deleteAllSlideshows() {
		this.slideshows.remove()
	}

	/**
	 * Update Slide
	 */
	updateSlide( key:string, name:string ) {
		console.log('key slide', key)
		let _slide = new Slide()
			_slide.name = name
		this.slides.update(key, {name:name})
	}

	/**
	 * Delete Slide
	 */
	deleteSlide( key:string, slide:Slide ) {
		console.log(slide)
		let storageRef = this._firebaseApp.storage().ref().child(slide.path)

		this.slides.remove(key)
		storageRef.delete().then(()=> {
			console.log('success!, File deleted successfully',)
		}).catch((error)=> {
			console.log('error: ',error)
		})		 
	}

	/**
	 * Show Full Image 
	 */
	showFullImage(slide:Slide){
		console.log('slide',slide)
		this.full_image = slide.url;
	}

	/**
	 * Constructor
	 */
	constructor( private _af: AngularFire, @Inject(FirebaseApp) _firebaseApp: firebase.app.App, _zone:NgZone) {
		this._zone = _zone
		this._firebaseApp = _firebaseApp
		this.slideshows = this._af.database.list('/slideshows', {})
	
		this.imageHelper = new ImageHelper()

		this.slideshows.subscribe(snapshot => {
			this.onSelect( snapshot[0] )
			console.log(snapshot[0]);
			// let element = document.querySelector(".slideshow-slides-container .list-group a:first-child");
			// 	element.className += " " + "active";
		})


		// this._messaging = firebase.messaging(this._firebaseApp)
        // this._messaging.requestPermission()
        //     .then(() => {
		// 		console.log('coool')
		// 	})
        //     .catch((error) => {
		// 		console.log('error', error)
		// 	})
	}

	ngOnInit() {}
}
