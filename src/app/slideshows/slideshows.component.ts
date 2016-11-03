import { Slideshow } from './../_model/Slideshow';
import { Component, Inject, NgZone, OnInit } from '@angular/core';
import {
	AngularFire,
	FirebaseObjectObservable,
	FirebaseListObservable,
	AuthProviders,
	FirebaseApp
} from 'angularfire2';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
	selector: 'app-slideshows',
	templateUrl: './slideshows.component.html',
	styleUrls: ['./slideshows.component.scss']
})
export class SlideshowsComponent implements OnInit {

	_zone;
	_firebaseApp;
	slideshows: FirebaseListObservable<any>;
	slides: FirebaseListObservable<any>;
	selectedSlideshow:Slideshow;
	selectedSlideKeySubject: BehaviorSubject<any>;

	onSelect( slideshow:Slideshow ) {
		console.log(slideshow);
		this.selectedSlideshow = slideshow;
		this.selectedSlideKeySubject.next( this.selectedSlideshow.$key );
	}

	createSlideshow( name: string ) {
			name = name.trim();
			if (!name) { return; }
			console.info('Slideshow Name:' , name);
			let slideshow = new Slideshow();
					slideshow.index=0;
					slideshow.name=name;
			this.slideshows.push(slideshow);
	}

	createSlide(name: string) {
			name = name.trim();
			let selectedSlideshowKey = this.selectedSlideshow.$key;
			if (!name) { return; }

			console.info('Slide Name:' , name);
			console.info('selected key' , this.selectedSlideshow.$key);

			this._af.database.list('/slides/').push({
				slideshowKey: this.selectedSlideshow.$key,
				name:name
			})
	}

	deleteSelectedSlideshow(key:string) {
		alert('Really ?')
		console.log('remove: ', key);
		//this.slideshows.remove(key);
	}

	deleteAll() {
					alert('Really ?')
		//this.slideshows.remove();
		//this.slides.remove();
	}
    resize (img, MAX_WIDTH:number = 900, MAX_HEIGHT:number = 900){
        var canvas = document.createElement("canvas");

        console.log("Size Before: " + img.src.length + " bytes");

        var width = img.width;
        var height = img.height;

        if (width > height) {
            if (width > MAX_WIDTH) {
                height *= MAX_WIDTH / width;
                width = MAX_WIDTH;
            }
        } else {
            if (height > MAX_HEIGHT) {
                width *= MAX_HEIGHT / height;
                height = MAX_HEIGHT;
            }
        }
        canvas.width = width;
        canvas.height = height;
        var ctx = canvas.getContext("2d");

        ctx.drawImage(img, 0, 0, width, height);

        var dataUrl = canvas.toDataURL('image/jpeg');  
        // IMPORTANT: 'jpeg' NOT 'jpg'
        console.log("Size After:  " + dataUrl.length  + " bytes");
        return dataUrl
    }
	deleteSlide( slide ) {
		console.log(slide.path)
		console.log(slide.$key)

	
		let storageRef = this._firebaseApp.storage().ref().child(slide.path);
		storageRef.delete().then( () => {
			console.log('success');
			this.slides.remove(slide.$key);
		}).catch( (error)=> {
			console.log('error');
		});
	}
	
	addImageToSelectedSlideshow(event, slide_key) {
		console.log(event, slide_key)
		let d = new Date();
		let time = d.getTime();
		let storageRef = this._firebaseApp.storage().ref().child('images/'+time+'.png');
		console.log("storageRef",storageRef);
		var files = event.srcElement.files;
		var file = files[0]; 
 		//let files_src: string[] = [];

        // for (var i = 0; i < files.length; i++) {

        //     files_src.push(files[i]);
		// 	console.log('files_src',files_src)	
        //     // Create an img element and add the image file data to it
        //     var img = document.createElement("img");
        //     img.src = window.URL.createObjectURL(files[i]);

        //     // Create a FileReader
        //     var reader = new FileReader();

        //     // Add an event listener to deal with the file when the reader is complete
        //     reader.addEventListener("load", (event) => {
        //         // Get the event.target.result from the reader (base64 of the image)
        //         img.src = event.currentTarget.result;

		// 		console.log('event result',event.currentTarget.result)
        //         // Resize the image
        //         var resized_img = this.resize(img);
		//  		file = resized_img; 
		// 		 console.log('resized')
		// 		});
        //         // Push the img src (base64 string) into our array that we display in our html template
        //         files_src.push(resized_img);
        //     }, false);

        //     reader.readAsDataURL(files[i]);
        // }

			storageRef.put(file).then( (snapshot) => {
				console.log('Uploaded a blob or file!',snapshot);
				console.log(snapshot.a.downloadURLs[0]);
				//this._zone.run( () => { 
				this.slides.update( slide_key, { 
					path: storageRef.a.path,
					url: snapshot.a.downloadURLs[0],
					name: file.name
				});
			});
			

	}

	constructor( private _af: AngularFire, @Inject(FirebaseApp) _firebaseApp: any, _zone:NgZone) {
		this._zone = _zone;
		this._firebaseApp = _firebaseApp;


		this.slideshows = this._af.database.list('/slideshows', {});
		this.selectedSlideKeySubject = new BehaviorSubject(null);
		this.slides = this._af.database.list('/slides', {
			query: {
				orderByChild: 'slideshowKey',
				equalTo: this.selectedSlideKeySubject
			}
		});
		this.slides.subscribe( queriedItems => {
				console.log('slides.subscribe change',queriedItems);
		});

	}

	ngOnInit() {}
}
