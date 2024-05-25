import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersService } from './orders.service';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-manage-orders',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './manage-orders.component.html',
  styleUrl: './manage-orders.component.css',
})
export class ManageOrdersComponent implements OnInit {
  orders: any = [];
  constructor(private ordersService: OrdersService) {}
  ngOnInit() {
    this.ordersService.getOrders().subscribe((orders) => {
      this.orders = orders;
    });
  }
  editOrder(value: string) {
    console.log(value);
  }
}
