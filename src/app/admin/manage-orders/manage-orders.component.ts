import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersService } from './orders.service';
@Component({
  selector: 'app-manage-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manage-orders.component.html',
  styleUrl: './manage-orders.component.css',
})
export class ManageOrdersComponent implements OnInit {
  orders: any = [];
  constructor(private ordersService: OrdersService) {}
  ngOnInit() {
    this.ordersService.getOrders().subscribe((orders) => {
      this.orders = orders;
      console.log(this.orders);
    });
  }
}
