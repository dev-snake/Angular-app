import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterLink } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  activeItemId: number | null = null;

  sidebar: any = [
    {
      id: 1,
      title: 'Dashboard',
      icon: 'bx bxs-category inline-block p-1 rounded-sm',
      url: '/admin',
    },
    {
      id: 2,
      title: 'Người dùng',
      icon: 'bx bx-user inline-block p-1 rounded-sm',
      url: 'manage-users',
    },
    {
      id: 3,
      title: 'Đơn hàng',
      icon: 'bx bx-basket inline-block p-1 rounded-sm',
      url: 'manage-orders',
    },
    {
      id: 4,
      title: 'Danh mục',
      icon: 'bx bx-category inline-block p-1 rounded-sm',
      url: 'manage-category',
    },
    {
      id: 5,
      title: 'Sản phẩm',
      icon: 'bx bxl-product-hunt inline-block p-1 rounded-sm',
      url: 'manage-product',
    },
    {
      id: 6,
      title: 'Thống kê',
      icon: 'bx bx-stats inline-block p-1 rounded-sm',
      url: 'manage-statistic',
    },
    {
      id: 7,
      title: 'Đăng xuất',
      icon: 'bx bx-log-out inline-block p-1 rounded-sm',
      url: '/logout',
    },
  ];

  changeActive(value: number) {
    this.activeItemId = value;
  }
}
