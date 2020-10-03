import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'customers', loadChildren: () => import('./pages/customers/customers.module').then(m => m.CustomersModule) },
  //ng generate module orders --route orders --module app.module //Whoa
  { path: 'orders', loadChildren: () => import('./pages/orders/orders.module').then(m => m.OrdersModule) },
  { path: '**', redirectTo: '/home' }
  // { path: '**', component: PageNotFoundComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false, useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
