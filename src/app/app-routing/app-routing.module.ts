import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent }   from '../dashboard/dashboard.component';
import { SlideshowsComponent }   from '../slideshows/slideshows.component';

const routes: Routes = [
  {   
    path: '', redirectTo: '/slideshows', 
    pathMatch: 'full' 
  },
  { 
    path: 'dashboard',  
    component: DashboardComponent 
  },
  { 
    path: 'slideshows',  
    component: SlideshowsComponent 
  },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}

