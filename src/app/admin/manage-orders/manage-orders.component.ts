import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../service/api/api.service';
import { RouterLink } from '@angular/router';
import { Order } from '../../shared/interfaces/order';
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
      this.orders = orders.reverse();
    });
  }
  onCheckboxChange(event: any, code: string) {
    if (event.target.checked) {
      this.apiOrders.updateOrder(code).subscribe({
        next: (response) => {
          console.log('Order updated:', response);
        },
        error: (error) => {
          console.error('Error updating order:', error);
        },
        complete: () => {
          console.log('Order update complete.');
        },
      });
      console.log('checked', code);
    } else {
      console.log('unchecked');
    }
  }
  filterSatatus(status: Event): void {
    const value = +(status.target as HTMLSelectElement).value;
    console.log('Value:', value);
    if (value === 99) {
      this.apiOrders.getOrders().subscribe((orders: Order[]) => {
        this.orders = orders.reverse();
      });
    } else if (value === 0) {
      this.apiOrders.getOrders().subscribe((orders: Order[]) => {
        this.orders = orders.filter((order) => order.status === 0).reverse();
      });
    } else if (value === 1) {
      this.apiOrders.getOrders().subscribe((orders: Order[]) => {
        this.orders = orders.filter((order) => order.status === 1).reverse();
      });
    } else if (value === 2) {
      this.apiOrders.getOrders().subscribe((orders: Order[]) => {
        this.orders = orders.filter((order) => order.status === 2).reverse();
      });
    } else if (value === 3) {
      this.apiOrders.getOrders().subscribe((orders: Order[]) => {
        this.orders = orders.filter((order) => order.status === 3).reverse();
      });
    }
  }
}
