import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';

import { AppComponent } from './app.component';

// Must export the config
export const firebaseConfig = {
  apiKey: 'AIzaSyAzrtKXwKL5kAoa9dbGt9x32YWA7Yi_Jec',
  authDomain: 'test-fad8a.firebaseapp.com',
  databaseURL: 'https://test-fad8a.firebaseio.com',
  storageBucket: 'test-fad8a.appspot.com',
  messagingSenderId: "113730117393"
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
