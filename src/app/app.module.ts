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

// const firebaseConfig = {
//     apiKey: "AIzaSyDveCJtWCu1zhyvqOBr9my4-n8_eqoeWeQ",
//     authDomain: "oauth-b4994.firebaseapp.com",
//     databaseURL: "https://oauth-b4994.firebaseio.com",
//     storageBucket: "oauth-b4994.appspot.com",
//     messagingSenderId: "803681908280"
// };

// NO AUTH
const firebaseConfig = {
    apiKey: "AIzaSyBNAi0kZtkStFTvFWtIkvlEsqBYUVjqvZE",
    authDomain: "slideshow-manager-cf739.firebaseapp.com",
    databaseURL: "https://slideshow-manager-cf739.firebaseio.com",
    storageBucket: "slideshow-manager-cf739.appspot.com",
    messagingSenderId: "567232249877"
};


// const firebaseConfig = {
//     apiKey: "AIzaSyCEHxdFH4p3OV0vxuoy9iIYsnE2UDG-coo",
//     authDomain: "oauth-usa.firebaseapp.com",
//     databaseURL: "https://oauth-usa.firebaseio.com",
//     storageBucket: "oauth-usa.appspot.com",
//     messagingSenderId: "621648931093"
// };
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
