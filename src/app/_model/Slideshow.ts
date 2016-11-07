import {
	AngularFire,
	FirebaseObjectObservable,
	FirebaseListObservable,
	AuthProviders,
	FirebaseApp
} from 'angularfire2';

export class Slideshow  extends FirebaseListObservable<any>{
    index: number;
    name: string;
    $key:string;
	slides
}
