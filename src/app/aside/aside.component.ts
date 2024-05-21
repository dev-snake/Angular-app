import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-aside',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.css',
})
export class AsideComponent {
  activeItemId: number | null = null;
  sidebar: any = [
    {
      id: 1,
      title: 'Dashboard',
      icon: 'bx bxs-category inline-block p-1 rounded-sm',
      url: '',
    },
    {
      id: 2,
      title: 'Người dùng',
      icon: 'bx bx-user inline-block p-1 rounded-sm',
      url: 'admin/manage-user',
    },
    {
      id: 3,
      title: 'Đơn hàng',
      icon: 'bx bx-basket inline-block p-1 rounded-sm',
      url: 'admin/manage-order',
    },
    {
      id: 4,
      title: 'Danh mục',
      icon: 'bx bx-category inline-block p-1 rounded-sm',
      url: 'admin/manage-category',
    },
    {
      id: 5,
      title: 'Sản phẩm',
      icon: 'bx bxl-product-hunt inline-block p-1 rounded-sm',
      url: 'admin/manage-product',
    },
    {
      id: 6,
      title: 'Đăng xuất',
      icon: 'bx bx-log-out inline-block p-1 rounded-sm',
      url: 'logout',
    },
  ];
  changeActive(id: number) {
    this.activeItemId = id;
  }
}
