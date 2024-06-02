import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageProductComponent } from './manage-product/manage-product.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { ManageOrdersComponent } from './manage-orders/manage-orders.component';
import { ManageCategoryComponent } from './manage-category/manage-category.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { ManageStatisticComponent } from './manage-statistic/manage-statistic.component';
import { ManageVoucherComponent } from './manage-voucher/manage-voucher.component';
const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: 'manage-product', component: ManageProductComponent },
      { path: 'manage-users', component: ManageUsersComponent },
      { path: 'manage-orders', component: ManageOrdersComponent },
      { path: 'manage-category', component: ManageCategoryComponent },
      {
        path: 'manage-orders/:id/order-detail',
        component: OrderDetailComponent,
      },
      {
        path: 'manage-vouchers',
        component: ManageVoucherComponent,
      },
      {
        path: 'manage-statistic',
        component: ManageStatisticComponent,
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
