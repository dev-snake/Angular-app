import { Component, OnInit } from '@angular/core';
import { OrderHistory } from '../../../../../shared/interfaces/order.history';
import { User } from '../../../../../shared/interfaces/user';
import { AuthService } from '../../../../../shared/service/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OrdersDetailComponent } from '../orders-detail/orders-detail.component';
@Component({
  selector: 'app-orders-history',
  standalone: true,
  imports: [CommonModule, RouterLink, OrdersDetailComponent],
  templateUrl: './orders-history.component.html',
  styleUrl: './orders-history.component.css',
})
export class OrdersHistoryComponent implements OnInit {
  public user: User | undefined;
  public orders: User | undefined;
  public orderHistory: OrderHistory[] | undefined;
  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.authService.getUsers().subscribe((user: User[]) => {
      this.user = user.find(
        (user: User) => user.username === this.authService.getUsername()
      );
      if (this.user) {
        this.orderHistory = this.user.orders;
      }
      console.log(this.orderHistory);
    });
  }
  get orderHistoryList(): any[] | undefined {
    return this.orderHistory;
  }
}
