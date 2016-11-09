import {
	AngularFire,
	FirebaseObjectObservable,
	FirebaseListObservable,
	AuthProviders,
	FirebaseApp
} from 'angularfire2';

export class Slideshow {
	$key?: string
    index: number;
    name: string;
	slides;
}
