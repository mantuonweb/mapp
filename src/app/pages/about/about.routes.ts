import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTES_CONSTS } from '../../../app/consts/app.routes';
import { AboutComponent } from './about.component';

const aboutRoutes: Routes = [
  {path: ROUTES_CONSTS.ABOUTUS, component: AboutComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(aboutRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AboutRouting {

}
