import { Component, Inject, NgZone } from '@angular/core';
import {
	AngularFire,
	FirebaseObjectObservable,
	FirebaseListObservable,
	AuthProviders,
	FirebaseApp
} from 'angularfire2';

import { Subject, } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})

export class AppComponent {

	title = 'app works!';
	user = null;
	sizeSubject: BehaviorSubject<any>;

	//item: FirebaseObjectObservable<any>;
	items: FirebaseListObservable<any>;
	name;
	_firebaseApp;
	newItem= {
		size:"",
		text:"",
		name:"",
		path:""
	};
	image: string;
	storageRef;
	_zone;
	constructor(private _af: AngularFire, @Inject(FirebaseApp) _firebaseApp: any, _zone:NgZone) {
<<<<<<< HEAD
		this.sizeSubject = new BehaviorSubject('');
=======
		this._firebaseApp = _firebaseApp;
		this._zone = _zone;
		this.sizeSubject = new Subject();
>>>>>>> 7404afb6ed8a274c9771384a4bbff2e763d33130
		this._af.auth.subscribe(user => {
			if (user) {
				// user logged in
				this.user = user;
				//console.log('Success: ',this.user);

		
				// this.items = this._af.database.list('/items', {
				// 	query: {
				// 		orderByChild: 'size',
				// 		equalTo: this.sizeSubject
				// 	}
				// });
				this.items = this._af.database.list('/items', {

				});

				// this.items = _af.database.list('/items', {
		
				// });

				//this.item = af.database.object('/item');
				//this.filterBy(null);
				this.items.subscribe(queriedItems => {
					console.log("queriedItems: ",queriedItems);  					
				});
			
				
				this.storageRef = _firebaseApp.storage().ref().child('images/image.png');
				this.storageRef.getDownloadURL().then(url =>
					_zone.run(() => { 
							this.image = url
							console.log(this.storageRef);
					})
				);

				// var storage = firebaseApp.storage();
				// console.log(storage);
				 //var storageRef = storage.ref();
			}
			else {
				// user not logged in
				this.user = null;
				console.log('Fail: ',this.user);
			}
		});

	}

	login() {
		this._af.auth.login();
		// this.af.auth.login({
		// 	provider: AuthProviders.Google
		// });
	}

	logout() {
		this._af.auth.logout();
	}

	saveItem(value:string) {
		console.log('set: ',this.newItem);
		this.items.push(this.newItem);
		//this.items.push({text:value});
	}

	deleteItem(key: string){
		console.log('set: ',this.name);
		this.items.remove(key); 
	}

	updateItem(key: string, newText: string) {
		console.log('update ', key, newText);
		this.items.update(key, { text: newText });
	}

	filterBy(size?: string) {
		if (size === 'all') {
			console.log("how ? see: https://github.com/angular/angularfire2/issues/642" );  
		}
		this.sizeSubject.next(size); 
	}
	deleteList() {
		this.items.remove();
	}

	uploadImage(event) {
		var files = event.srcElement.files;
		var file = files[0]; 
		this.storageRef.put(file).then( (snapshot) => {
			console.log('Uploaded a blob or file!',snapshot);
		});
    	console.log(files[0]);
	}

	addImage(event, key: string) {
		var d = new Date();
		var time = d.getTime();
		console.log('time',time);
		console.log('key',key);
		let storageRef = this._firebaseApp.storage().ref().child('images/'+time+'.png');
		console.log("storageRef",storageRef);

		var files = event.srcElement.files;
		var file = files[0]; 
		//console.log(file.name);

		storageRef.put(file).then( (snapshot) => {
			console.log('Uploaded a blob or file!',snapshot);
			console.log(snapshot.a.downloadURLs[0]);
			this._zone.run(() => { 
				this.items.update(key, { 
					path: storageRef.a.path,
					url: snapshot.a.downloadURLs[0],
					name: file.name
				});
		
			})
		});
		
	}

	ngOnInit() {
		//console.log('constructor: ',this.item);
		//this.filterBy();
	}

}
