import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Products } from '../../interfaces/product';
@Injectable({
  providedIn: 'root',
})
export class DataService {
  private messageSource = new BehaviorSubject([]);
  currentMessage = this.messageSource.asObservable();
  constructor() {}
  changeMessage(product: Products[]) {
    this.messageSource.next(product as []);
  }
  public satisfactionLevels = [
    {
      id: 1,
      icon: 'fa-solid fa-face-angry',
      lalel: 'Rất tệ',
    },
    {
      id: 2,
      icon: 'fa-solid fa-face-sad-tear',
      lalel: 'Tệ',
    },
    {
      id: 3,
      icon: 'fa-solid fa-face-smile',
      lalel: 'Bình thường',
    },
    {
      id: 4,
      icon: 'fa-solid fa-face-grin-beam',
      lalel: 'Tốt',
    },
    {
      id: 5,
      icon: 'fa-solid fa-face-grin-hearts',
      lalel: 'Rất tốt',
    },
  ];
  public sidebar: any = [
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
      title: 'Vouchers',
      icon: 'fa-solid fa-ticket p-1 rounded-sm',
      url: 'manage-vouchers',
    },
    {
      id: 8,
      title: 'Feedbacks',
      icon: 'fa-solid fa-comment p-1 rounded-sm',
      url: 'feedbacks',
    },
    {
      id: 9,
      title: 'Đăng xuất',
      icon: 'bx bx-log-out inline-block p-1 rounded-sm',
      url: '',
    },
  ];
}
