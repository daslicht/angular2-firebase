import { Component, Inject } from '@angular/core';
import {
	AngularFire,
	FirebaseObjectObservable,
	FirebaseListObservable,
	AuthProviders,
	FirebaseApp
} from 'angularfire2';
import { Subject } from 'rxjs/Subject';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})

export class AppComponent {

	title = 'app works!';
	user = null;
	sizeSubject: Subject<any>;
	//item: FirebaseObjectObservable<any>;
	items: FirebaseListObservable<any>;
	name;
	newItem= {
		size:"",
		text:""
	};
	image: string;
	constructor(private af: AngularFire, @Inject(FirebaseApp) firebaseApp: any) {
		this.sizeSubject = new Subject();
		this.af.auth.subscribe(user => {
			if (user) {
				// user logged in
				this.user = user;
				console.log('Success: ',this.user);

				this.items = af.database.list('/items', {
					query: {
						orderByChild: 'size',
						equalTo: this.sizeSubject
					}
				});
				//this.item = af.database.object('/item');
				this.items.subscribe(queriedItems => {
					console.log("queriedItems: ",queriedItems);  
				});

				const storageRef = firebaseApp.storage().ref().child('images/image.png');
					storageRef.getDownloadURL().then(url => this.image = url);
			}
			else {
				// user not logged in
				this.user = null;
				console.log('Fail: ',this.user);
			}
		});

	}

	login() {
		this.af.auth.login();
		// this.af.auth.login({
		// 	provider: AuthProviders.Google
		// });
	}

	logout() {
		this.af.auth.logout();
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

	filterBy(size: string) {
		this.sizeSubject.next(size); 
		// this.items = this.af.database.list('/items', {
		// 	query: {
		// 		orderByChild: 'size',
		// 		equalTo: this.sizeSubject
		// 	}
		// });

	}
	deleteList() {
		this.items.remove();
	}


	ngOnInit() {
		//console.log('constructor: ',this.item);
	}

}
