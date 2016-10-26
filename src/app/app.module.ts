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

// const firebaseConfig = {
//     apiKey: "AIzaSyDveCJtWCu1zhyvqOBr9my4-n8_eqoeWeQ",
//     authDomain: "oauth-b4994.firebaseapp.com",
//     databaseURL: "https://oauth-b4994.firebaseio.com",
//     storageBucket: "oauth-b4994.appspot.com",
//     messagingSenderId: "803681908280"
// };

const firebaseConfig = {
    apiKey: "AIzaSyCEHxdFH4p3OV0vxuoy9iIYsnE2UDG-coo",
    authDomain: "oauth-usa.firebaseapp.com",
    databaseURL: "https://oauth-usa.firebaseio.com",
    storageBucket: "oauth-usa.appspot.com",
    messagingSenderId: "621648931093"
};
const firebaseAuthConfig = {
    provider: AuthProviders.Google,
    method: AuthMethods.Redirect 
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig,firebaseAuthConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
