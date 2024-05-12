import { Routes } from '@angular/router';
import { HomeComponent } from './layout/home/home.component';
import { PageProductComponent } from './layout/pages/page-product/page-product.component';
import { PageDetailComponent } from './layout/pages/page-detail/page-detail.component';
import { PageCartComponent } from './layout/pages/page-cart/page-cart.component';
import { PagePaymentComponent } from './layout/pages/page-payment/page-payment.component';
import { LoginComponent } from './layout/pages/auth/login/login.component';
import { RegsiterComponent } from './layout/pages/auth/regsiter/regsiter.component';
// import { AuthGuard } from './core/guards/auth.guard';
import { PageNotFoundComponent } from './layout/pages/page-not-found/page-not-found.component';
export const routes: Routes = [
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
    path: '**',
    component: PageNotFoundComponent,
  },
];
