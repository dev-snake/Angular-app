import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageProductComponent } from './manage-product/manage-product.component';
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AdminRoutingModule,
    DashboardComponent,
    ManageProductComponent,
  ],
})
export class AdminModule {}
