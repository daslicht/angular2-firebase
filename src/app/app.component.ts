import { Component } from '@angular/core';
import {
	AngularFire,
	FirebaseObjectObservable,
	AuthProviders
} from 'angularfire2';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})

export class AppComponent {

	title = 'app works!';
	
	user = null;
	item: FirebaseObjectObservable<any>;

	constructor(private af: AngularFire) {

		this.af.auth.subscribe(user => {
			if (user) {
				// user logged in
				this.user = user;
				console.log('Success: ',this.user);
			}
			else {
				// user not logged in
				this.user = null;
				console.log('Fail: ',this.user);
			}
		});

		//this.item = af.database.object('/item');
	}

	login() {
		this.af.auth.login({
			provider: AuthProviders.Google
		});
	}

	logout() {
		this.af.auth.logout();
	}

}
