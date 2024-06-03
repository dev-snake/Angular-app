import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../shared/service/auth/auth.service';
import { User } from '../../shared/interfaces/user';
import { ToastService } from '../../shared/service/toast/toast.service';
import { DataService } from '../../shared/service/data/data.service';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  public activeItemId: number | null = null;
  public sidebar: any = this.dataService.sidebar;
  constructor(
    private route: Router,
    private auth: AuthService,
    private toastService: ToastService,
    private dataService: DataService
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
