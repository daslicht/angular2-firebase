import { SlidesService } from './_data/slides.service';
import { SlideshowsService } from './_data/slideshows.service';
import { DataStore } from './_data/data.store';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { 
  AngularFireModule, 
  AuthMethods, 
  AuthProviders 
} from "angularfire2";

import { AppComponent } from './app.component';
import { SlideshowsComponent } from './slideshows/slideshows.component';
import { AppRoutingComponent } from './app-routing/app-routing.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { SlideshowListComponent } from './slideshow-list/slideshow-list.component';
import { SlideshowDetailsComponent } from './slideshow-details/slideshow-details.component';



// NO AUTH 
const firebaseConfig = {
    apiKey: "AIzaSyC7xkhj17L0tZIiBDoruRchJJJZoWGemQ8",
    authDomain: "slides-inline.firebaseapp.com",
    databaseURL: "https://slides-inline.firebaseio.com",
    storageBucket: "slides-inline.appspot.com",
    messagingSenderId: "14006184383"
};


const firebaseAuthConfig = {
    provider: AuthProviders.Google,
    method: AuthMethods.Redirect 
}

@NgModule({
  declarations: [
    AppComponent,
    SlideshowsComponent,
    AppRoutingComponent,
    SlideshowListComponent,
    SlideshowDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    //AngularFireModule.initializeApp(firebaseConfig,firebaseAuthConfig),
    AppRoutingModule,
  ],
  providers: [DataStore,SlideshowsService,SlidesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
