import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { ApiService } from '../service/api/api.service';
import { Order } from '../../shared/interfaces/order';
@Component({
  selector: 'app-manage-statistic',
  standalone: true,
  imports: [],
  templateUrl: './manage-statistic.component.html',
  styleUrls: ['./manage-statistic.component.css'],
})
export class ManageStatisticComponent implements OnInit {
  constructor(private API: ApiService) {}

  ngOnInit(): void {
    this.API.getOrders().subscribe((listOrder: Order[]) => {
      const orders = listOrder.filter((order) => order.status !== 2);
      const monthlyRevenue = this.calculateMonthlyRevenue(orders);
      this.renderChart(monthlyRevenue);
    });
  }

  calculateMonthlyRevenue(orders: Order[]): number[] {
    const monthlyRevenue = new Array(12).fill(0);
    orders.forEach((order) => {
      console.log(order);
      const orderDate = new Date(order.date);
      const month = orderDate.getMonth();
      if (!isNaN(month)) {
        monthlyRevenue[month] += order.total;
      } else {
        console.error('Invalid month');
      }
    });
    return monthlyRevenue;
  }

  renderChart(monthlyRevenue: number[]): void {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December',
        ],
        datasets: [
          {
            label: 'Biểu đồ doanh thu',
            data: monthlyRevenue,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 205, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(201, 203, 207, 0.2)',
              'rgb(202, 244, 66, 0.2)',
              'rgb(181, 241, 204, 0.2)',
              'rgb(148, 255, 216, 0.2)',
              'rgb(148, 255, 216, 0.2)',
              'rgb(202, 244, 255, 0.2)',
            ],
            borderColor: [
              'rgb(255, 99, 132)',
              'rgb(255, 159, 64)',
              'rgb(255, 205, 86)',
              'rgb(75, 192, 192)',
              'rgb(54, 162, 235)',
              'rgb(153, 102, 255)',
              'rgb(201, 203, 207)',
              'rgb(229, 253, 209)',
              'rgb(181, 241, 204)',
              'rgb(148, 255, 216)',
              'rgb(148, 255, 216)',
              'rgb(202, 244, 255)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        layout: {
          padding: 40,
        },
      },
    });
  }
}
