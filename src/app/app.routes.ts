import { Routes } from '@angular/router';
import { HomeComponent } from './layout/home/home.component';
import { PageProductComponent } from './layout/pages/page-product/page-product.component';
import { PageDetailComponent } from './layout/pages/page-detail/page-detail.component';
import { PageCartComponent } from './layout/pages/page-cart/page-cart.component';
import { PagePaymentComponent } from './layout/pages/page-payment/page-payment.component';
import { LoginComponent } from './layout/pages/auth/login/login.component';
import { RegsiterComponent } from './layout/pages/auth/regsiter/regsiter.component';
import { PageNotFoundComponent } from './layout/pages/page-not-found/page-not-found.component';
import { PageProfileComponent } from './layout/pages/page-profile/page-profile.component';
import { PersonalInformationComponent } from './layout/pages/page-profile/personal-information/personal-information.component';
export const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'products',
    component: PageProductComponent,
  },
  {
    path: 'products/:productId',
    component: PageDetailComponent,
  },

  {
    path: 'cart',
    component: PageCartComponent,
  },
  {
    path: 'payment',
    component: PagePaymentComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'regsiter',
    component: RegsiterComponent,
  },
  {
    path: 'profile',
    component: PageProfileComponent,
    children: [
      {
        path: 'personal-information',
        component: PersonalInformationComponent,
      },
    ],
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];
