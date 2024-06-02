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
  onCheckboxChange(event: Event, code: string) {
    const target = event.target as HTMLInputElement;
    if (target && target.checked !== undefined) {
      if (target.checked) {
        const orderCode = code.split('');
        orderCode.shift();
        const orderCodeString = orderCode.join('');
        this.apiOrders.updateOrder(orderCodeString).subscribe({
          next: (order: Order) => {
            console.log('Order updated:', order);
            console.log('checked');
          },
          error: (err: any) => {
            console.error('API update failed:', err);
          },
        });
      } else {
        console.log('unchecked');
      }
    } else {
      console.error('Event target is not a checkbox or is null');
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
