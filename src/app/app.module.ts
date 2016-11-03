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
import { DashboardComponent } from './dashboard/dashboard.component';
import { SlideshowsComponent } from './slideshows/slideshows.component';
import { AppRoutingComponent } from './app-routing/app-routing.component';
import { AppRoutingModule } from './app-routing/app-routing.module';



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
    DashboardComponent,
    SlideshowsComponent,
    AppRoutingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    //AngularFireModule.initializeApp(firebaseConfig,firebaseAuthConfig),
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
