import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../shared/service/auth/auth.service';
import { User } from '../../shared/interfaces/user';
import { ToastService } from '../../shared/service/toast/toast.service';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  public activeItemId: number | null = null;
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
      title: 'Đăng xuất',
      icon: 'bx bx-log-out inline-block p-1 rounded-sm',
      url: '/logout',
    },
  ];
  constructor(
    private route: Router,
    private auth: AuthService,
    private toastService: ToastService
  ) {}
  changeActive(value: number) {
    this.activeItemId = value;
  }
  ngOnInit(): void {
    const url = this.route.url;
    if (url.startsWith('/admin')) {
      const username_customer = this.auth.getUsername();
      this.auth.getUsers().subscribe((users: User[]) => {
        const user = users.find(
          (user: User) => user.username === username_customer
        );
        if (user?.role !== 1) {
          this.route.navigate(['/']);
        }
      });
    }
  }
  public logout() {
    this.toastService.showToast('Đăng xuất thành công', '#17c964');
    this.route.navigateByUrl('/');
  }
}
