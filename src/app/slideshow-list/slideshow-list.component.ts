import { DataStore } from './../_data/data.store';
import { Slideshow } from './../_data/types/Slideshow';
import { Component, OnInit, Input } from '@angular/core';
import {BehaviorSubject} from "rxjs/Rx";
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
	slideshows:BehaviorSubject<FirebaseListObservable<Slideshow[]>>

	// @Input()
	// slides : FirebaseListObservable<any>

	constructor( private dataStore:DataStore) { }


	/**
	 * Set Selected Slideshow as current
	 */
	onSelect( slideshow:Slideshow ) {
		this.dataStore.selectSlideshow(slideshow);	
	}

	createSlideshow(name: string) {
		//this.dataStore.createSlideshow(slideshow, name)
	}
	/**
	 * BEHAVE !
	 */
	deleteAllSlideshows() {
		
	}

	ngOnInit() {
	}

}
