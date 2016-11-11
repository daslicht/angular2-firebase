import { DataStore } from './../_data/data.store';
import { SlidesService } from './../_data/slides.service';
import { SlideshowsService } from './../_data/slideshows.service';
import { Component, Inject, NgZone, OnInit } from '@angular/core'
import {Observable} from 'rxjs/Observable';

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
	styleUrls: ['./slideshows.component.scss'],
	providers:[SlideshowsService,SlidesService]
})

export class SlideshowsComponent implements OnInit {

	/**
	 * 	
	 * Constructor
	 * see: https://angular.io/docs/ts/latest/tutorial/toh-pt4.html
	 */
	constructor( private dataStore: DataStore ) {}

	ngOnInit() {
		
	}
}
