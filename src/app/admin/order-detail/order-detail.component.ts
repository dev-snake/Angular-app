import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OrdersService } from '../service/manage-orders/orders.service';
import { ApiService } from '../service/api/api.service';
@Component({
  selector: 'app-order-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.css',
})
export class OrderDetailComponent implements OnInit {
  selectedStatus: HTMLSelectElement | string = '';
  orderId: string | undefined;
  orderDetails: any;
  listOfProductsBuyed: any;
  updateOrderList: any;
  constructor(
    private route: ActivatedRoute,
    private ordersService: OrdersService,
    private apiOrders: ApiService
  ) {}
  ngOnInit(): void {
    this.getOrdersList();
  }
  getOrdersList() {
    this.route.params.subscribe((params) => {
      this.orderId = params['id'];
      this.apiOrders.getOrders().subscribe((orders: any) => {
        this.orderDetails = orders.find(
          (order: any) => order.code === this.orderId
        );
        this.listOfProductsBuyed = this.orderDetails.products;
      });
    });
  }
  updateOrders() {
    this.apiOrders.getOrders().subscribe((orderList: any) => {
      this.updateOrderList = orderList;
    });
  }
  OnchangeStatusOrder(
    event: Event,
    orderId: string,
    userId: string,
    codeOrders: string
  ) {
    this.selectedStatus = (event.target as HTMLSelectElement).value;
    this.ordersService
      .updateOrderStatus(orderId, +this.selectedStatus, userId, codeOrders)
      .subscribe((data) => {
        console.log(data);
      });
  }
}
