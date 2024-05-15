import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../../../interface';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.css',
})
export class OrderHistoryComponent {
  user: User | undefined;
  orders: User | undefined;
  orderHistory: any[] | undefined;
  code_order: string | undefined;
  isViewOrderDetails: boolean = false;
  isViewDetail: any;
  constructor(private authService: AuthService, private route: Router) {
    this.authService.getUsers().subscribe((user: User[]) => {
      this.user = user.find(
        (user: User) => user.username === this.authService.getUsername()
      );
      if (this.user) {
        this.orderHistory = this.user.orders;
        console.log(this.orderHistory);
      }
    });
  }
  get orderHistoryList(): any[] | undefined {
    return this.orderHistory;
  }
  get isLoggedIn(): boolean {
    return JSON.parse(localStorage.getItem('isLoggedIn') || 'false');
  }
  viewOrderDetail(code: any): void {
    this.route.navigate(['/profile'], {
      queryParams: { isViewOrderDetails: true, code_order: code },
    });
  }
}
