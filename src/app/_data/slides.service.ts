import { Slideshow } from './types/Slideshow';
import { Slide } from './types/Slide';
import { Injectable } from '@angular/core';
import {
	AngularFire,
	FirebaseObjectObservable,
	FirebaseListObservable,
	AuthProviders,
	FirebaseApp
} from 'angularfire2'

@Injectable()
export class SlidesService {

  constructor(private _af: AngularFire) { }

  createSlide( slideshow:Slideshow, name:string ) {
		name = name.trim()
		let slide = new Slide()
			  slide.name = name
			  slide.preview = 'https://placeholdit.imgix.net/~text?txtsize=9&txt=100×100&w=100&h=100'
		this._af.database.list('/slideshows/' + slideshow.$key + '/slides').push(slide)
  }

  readSlides( slideshow:Slideshow ) {

  }
  
  updateSlide( slide:Slide ){
		// console.log('key slide', key)
		// let _slide = new Slide()
		// 	_slide.name = name
		// this.slides.update(key, {name:name})
    //@Inject(FirebaseApp) _firebaseApp: firebase.app.App,
  }

  deleteSlide( slide:Slide ) {

  }


}
