import { DataStore } from './../_data/data.store';
import { BehaviorSubject } from 'rxjs/Rx';
import { ImageHelper,VO } from '../slideshows/ImageHelper'
import { Slideshow } from '../_data/types/Slideshow'
import { Slide } from '../_data/types/Slide'
import { Component, OnInit, Input, Inject } from '@angular/core'
import {
	AngularFire,
	FirebaseObjectObservable,
	FirebaseListObservable,
	AuthProviders,
	FirebaseApp
} from 'angularfire2'

@Component({
	selector: 'app-slideshow-details',
	templateUrl: './slideshow-details.component.html',
	styleUrls: ['./slideshow-details.component.css']
})

export class SlideshowDetailsComponent implements OnInit {

	@Input()
	selectedSlideshow:BehaviorSubject<Slideshow> 

	_firebaseApp
	full_image

	imageHelper

	currentSlide

	constructor(private dataStore:DataStore, @Inject(FirebaseApp) _firebaseApp: firebase.app.App) { 
		this.imageHelper = new ImageHelper()	
		this._firebaseApp = _firebaseApp
	}
	ngOnInit() {
		this.selectedSlideshow.subscribe( (snapshot)=> {
			//let s = snapshot as 
			console.log('selectedSlideshow changed: ', snapshot.slides )

		})
	}


	doit(slideshow){
		console.log(this.selectedSlideshow)
	}

	createSlide(name: string) {

	}

	readSlides() {

	}

	updateSlide( key:string, name:string ) {

	}

	/**
	 * Delete Slide
	 */
	deleteSlide( key:string, slide:Slide ) {
		// console.log(slide)
		// let storageRef = this._firebaseApp.storage().ref().child(slide.path)

		// this.slides.remove(key)
		// storageRef.delete().then(()=> {
		// 	console.log('success!, File deleted successfully',)
		// }).catch((error)=> {
		// 	console.log('error: ',error)
		// })		 
	}
	/**
	 * Add Image to Slide Item
	 */
	private addImageToSlide(event) {
		
		// let d = new Date()
		// let time = d.getTime()
		
		// let storageRef = this._firebaseApp.storage().ref().child('images/'+time+'.png')
		// console.log('key',this.currentSlide.$key)
		// console.log("storageRef",storageRef)

		
		// let files = event.target.files
		// let file = files[0] 

		// this.imageHelper.resizeWithCanvas(file).then((vo:VO)=>{
		// 	console.log("VO:",vo)
		// 	this.currentSlide.url = vo.preview
		// 	storageRef.put(file).then( (snapshot) => {
		// 		console.log('Uploaded a blob or file!',snapshot)
		// 		console.log(snapshot.a.downloadURLs[0])

		// 		let _slide = new Slide()
		// 			_slide.path = storageRef.a.path
		// 			_slide.url = snapshot.a.downloadURLs[0]
		// 			_slide.preview = vo.preview
					
		// 		this.slides.update(this.currentSlide.$key, _slide )
		// 	})
		// })
	}

	/**
	 * Open File Dialog 
	 */
	openFileDialog( slide:Slide ) {
		// this.currentSlide = slide
		// let fileInput = document.createElement('input')
		// 	fileInput.type = "file"
		// 	fileInput.addEventListener('change', (event)=>{
		// 		console.log('change!: ', event)
		// 		this.addImageToSlide(event)
		// 	})
		// fileInput.click()
	
		// console.log(this.currentSlide)
	}

	/***
	 * see: https://medium.com/@NetanelBasal/angular-2-improve-performance-with-trackby-cc147b5104e5#.f3zkxuibd
	 */
	trackByFn(index, item) {
		console.log('trackby! called')
		return index // or item.id
	}

	/**
	 * Show Full Image 
	 */
	showFullImage(slide:Slide){
		console.log('slide',slide)
		this.full_image = slide.url
	}


}
