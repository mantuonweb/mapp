import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './orders.component';
import { SharedModule } from './../../core/shared/shared.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [OrdersComponent],
  imports: [
    SharedModule,
    FormsModule,
    OrdersRoutingModule,
    HttpClientModule
  ]
})
export class OrdersModule { }
