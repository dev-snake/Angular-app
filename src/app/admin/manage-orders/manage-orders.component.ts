import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../service/api/api.service';
import { RouterLink } from '@angular/router';
import { Order } from '../../interface';
@Component({
  selector: 'app-manage-orders',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './manage-orders.component.html',
  styleUrl: './manage-orders.component.css',
})
export class ManageOrdersComponent implements OnInit {
  orders: Order[] | undefined;
  constructor(private apiOrders: ApiService) {}
  ngOnInit() {
    this.apiOrders.getOrders().subscribe((orders: Order[]) => {
      this.orders = orders;
    });
  }
}
