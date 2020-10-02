import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTES_CONSTS } from '../../../app/consts/app.routes';
import { HomeComponent } from './home.component';

const homeRoutes: Routes = [
  {path: ROUTES_CONSTS.HOME, component: HomeComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(homeRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class HomeRouting {

}
