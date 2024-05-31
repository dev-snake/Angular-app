import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../../shared/service/auth/auth.service';
import { Order, User } from '../../../../shared/interfaces/interface';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../../shared/service/api/api.service';
import { ToastService } from '../../../../shared/service/toast/toast.service';
@Component({
  selector: 'app-lookup-orders',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './lookup-orders.component.html',
  styleUrl: './lookup-orders.component.css',
})
export class LookupOrdersComponent {
  @ViewChild('text_notifi') text!: ElementRef;
  @ViewChild('orderInfor') orderInfor!: ElementRef;
  public user: User | undefined;
  public listOrdersOfUser: Order[] | any = [];
  public lookupOrderInfor: Order | undefined;
  constructor(
    private apiUser: AuthService,
    private API: ApiService,
    private toastService: ToastService
  ) {
    this.apiUser.getUsers().subscribe((users: User[]) => {
      this.user = users.find(
        (user: User) => user.username === this.apiUser.getUsername()
      );
      this.listOrdersOfUser = this.user?.orders;
    });
  }
  lookupOrder(code: string) {
    if (!code.length) {
      this.toastService.showToast('Vui lòng nhập mã đơn hàng!', '#ff0000');
      return;
    }
    this.API.getOrders().subscribe((orders: Order[]) => {
      this.lookupOrderInfor = orders.find(
        (order: Order) => order.code === code
      );
      if (!this.lookupOrderInfor) {
        this.orderInfor.nativeElement.classList.add('hidden');
        this.toastService.showToast('Mã đơn hàng không đúng !', '#ff0000');
        return;
      }
      if (this.lookupOrderInfor) {
        this.text.nativeElement.classList.add('hidden');
        this.orderInfor.nativeElement.classList.remove('hidden');
      }
    });
  }
}
