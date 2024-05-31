import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../../shared/service/auth/auth.service';
import { Products } from '../../../../../shared/interfaces/product';
import { User } from '../../../../../shared/interfaces/user';
import { OrderHistory } from '../../../../../shared/interfaces/order.history';
@Component({
  selector: 'app-orders-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders-detail.component.html',
  styleUrl: './orders-detail.component.css',
})
export class OrdersDetailComponent implements OnInit {
  @Input() name: string = '';
  public orderId: string | null = null;
  public user: User | undefined;
  public orderHistory: any;
  public orderDetail: Products[] | undefined;
  public orderDetailInfor: OrderHistory | any;
  constructor(
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.authService.getUsers().subscribe((user: User[]) => {
      this.user = user.find(
        (user: User) => user.username === this.authService.getUsername()
      );
      if (this.user) {
        this.orderHistory = this.user.orders;
      }
      this.route.paramMap.subscribe((params) => {
        this.orderId = params.get('id');
        this.orderDetailInfor = this.orderHistory.find(
          (order: any) => order.code === this.orderId
        );
        this.orderDetail = this.orderHistory.find(
          (order: any) => order.code === this.orderId
        ).products;
      });
    });
  }
}
