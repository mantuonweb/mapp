import { NgModule } from '@angular/core';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './orders.component';
import { SharedModule } from './../../core/shared/shared.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [OrdersComponent],
  imports: [
    SharedModule,
    FormsModule,
    OrdersRoutingModule
  ]
})
export class OrdersModule { }
