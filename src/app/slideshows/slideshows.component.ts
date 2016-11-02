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

  slideshows: FirebaseListObservable<any>;
  selectedSlideshow:Slideshow;

  onSelect(slideshow:Slideshow) {
    console.log(slideshow);
    this.selectedSlideshow = slideshow;
  }

  getSlideshows() {
    this.slideshows = this._af.database.list('/slideshows', {});
  }

  createSlideshow(name: string) {
      name = name.trim();
      if (!name) { return; }
      console.info('Slideshow Name:' , name);

      this.slideshows.push({
        name: name
      });
  }

  createSlide(name: string) {
      name = name.trim();
      if (!name) { return; }
      console.info('Slideshow Name:' , name);

      this.selectedSlideshow.push({
        name: name
      });
  }

  constructor( private _af: AngularFire, @Inject(FirebaseApp) _firebaseApp: any, _zone:NgZone) { 
    this.slideshows = this._af.database.list('/slideshows', {});
  }

  ngOnInit() {}
}
