import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { User } from '../../../interface';
import { ViewOrderDetailsComponent } from './view-order-details/view-order-details.component';
@Component({
  selector: 'app-page-profile',
  standalone: true,
  imports: [
    OrderHistoryComponent,
    ChangePasswordComponent,
    RouterLink,
    CommonModule,
    ViewOrderDetailsComponent,
  ],
  templateUrl: './page-profile.component.html',
  styleUrl: './page-profile.component.css',
})
export class PageProfileComponent implements OnInit {
  isOrderHistory: boolean = false;
  isChangePassword: boolean = false;
  isViewOrderDetails: boolean = false;
  getUser: User | undefined;
  dataOrderDetails: any;
  dataOrderPayment?: any[];
  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {
    if (this.authService.isLoggedIn()) {
      this.authService.getUsers().subscribe((data) => {
        this.getUser = data.find(
          (user: User) => user.username === this.authService.getUsername()
        );
      });
    }
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.isOrderHistory = params.get('isOrderHistory') === 'true';
      if (params.get('isOrderHistory') === 'true') {
        this.isOrderHistory = true;
        this.isChangePassword = false;
        this.isViewOrderDetails = false;
      }
      if (params.get('isChangePassword') === 'true') {
        this.isChangePassword = true;
        this.isOrderHistory = false;
        this.isViewOrderDetails = false;
      }
      if (params.get('isViewOrderDetails') === 'true') {
        this.dataOrderDetails = this.getUser?.orders.find(
          (order: any) => order.code === params.get('code_order')
        ).products;
        this.dataOrderPayment = this.getUser?.orders.find(
          (order: any) => order.code === params.get('code_order')
        );
        this.isViewOrderDetails = true;
        this.isOrderHistory = false;
        this.isChangePassword = false;
      }
    });
  }
  logout(): void {
    this.router.navigate(['/']);
    return this.authService.saveLogoutFromLocalStorage();
  }
}
