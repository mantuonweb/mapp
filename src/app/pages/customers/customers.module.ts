import { NgModule } from '@angular/core';

import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersComponent } from './customers.component';
import { SharedModule } from './../../core/shared/shared.module';


@NgModule({
  declarations: [CustomersComponent],
  imports: [
    SharedModule,
    CustomersRoutingModule
  ]
})
export class CustomersModule { }
