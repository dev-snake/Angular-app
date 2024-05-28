import { Routes } from '@angular/router';
import { HomeComponent } from './layout/home/home.component';
import { PageProductComponent } from './layout/pages/page-product/page-product.component';
import { PageDetailComponent } from './layout/pages/page-detail/page-detail.component';
import { PageCartComponent } from './layout/pages/page-cart/page-cart.component';
import { PagePaymentComponent } from './layout/pages/page-payment/page-payment.component';
import { LoginComponent } from './layout/pages/auth/login/login.component';
import { RegsiterComponent } from './layout/pages/auth/regsiter/regsiter.component';
import { PageNotFoundComponent } from './layout/pages/page-not-found/page-not-found.component';
import { SearchComponent } from './layout/pages/search/search.component';

export const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('../app/layout/pages/profile/profile.module').then(
        (m) => m.ProfileModule
      ),
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
    path: 'search',
    component: SearchComponent,
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];
