import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SlideshowsComponent }   from '../slideshows/slideshows.component';

const routes: Routes = [
  // {   
  //   path: '', redirectTo: '', 
  //   pathMatch: 'full' 
  // },
  { 
    path: '',  
    component: SlideshowsComponent 
  },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}

