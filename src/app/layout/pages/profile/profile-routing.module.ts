import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { OrdersHistoryComponent } from './orders-history/orders-history.component';
import { PersonalInformationComponent } from './personal-information/personal-information.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { OrdersDetailComponent } from './orders-detail/orders-detail.component';
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
        path: 'change-password',
        component: ChangePasswordComponent,
      },
      {
        path: ':id/order-detail',
        component: OrdersDetailComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
