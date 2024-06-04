import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { OrdersHistoryComponent } from './orders-history/orders-history.component';
import { PersonalInformationComponent } from './personal-information/personal-information.component';
import { OrdersDetailComponent } from './orders-detail/orders-detail.component';
import { LookupOrdersComponent } from './lookup-orders/lookup-orders.component';
import { ExchangePointComponent } from './exchange-point/exchange-point.component';
import { MyVoucherComponent } from './exchange-point/my-voucher/my-voucher.component';
const routes: Routes = [
  {
    path: '',
    component: AccountComponent,
    children: [
      {
        path: 'orders-history',
        component: OrdersHistoryComponent,
      },
      {
        path: 'personal-information',
        component: PersonalInformationComponent,
      },
      {
        path: 'exchange-point',
        component: ExchangePointComponent,
      },
      {
        path: ':id/order-detail',
        component: OrdersDetailComponent,
      },
      {
        path: 'lookup-orders',
        component: LookupOrdersComponent,
      },
      {
        path: 'my-voucher',
        component: MyVoucherComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
