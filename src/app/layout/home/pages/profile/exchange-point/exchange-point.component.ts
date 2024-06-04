import { Component, ChangeDetectorRef } from '@angular/core';
import { ApiService } from '../../../../../shared/service/api/api.service';
import { Voucher } from '../../../../../shared/interfaces/voucher';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../../shared/service/auth/auth.service';
import { User } from '../../../../../shared/interfaces/user';
import { ToastService } from '../../../../../shared/service/toast/toast.service';
import { ExchangePointService } from '../../../../../shared/service/exchange-point/exchange-point.service';
import { RouterLink } from '@angular/router';
import { MyVoucherComponent } from './my-voucher/my-voucher.component';
@Component({
  selector: 'app-exchange-point',
  standalone: true,
  imports: [CommonModule, RouterLink, MyVoucherComponent],
  templateUrl: './exchange-point.component.html',
  styleUrl: './exchange-point.component.css',
})
export class ExchangePointComponent {
  public vouchers: Voucher[] = [];
  public userId: any = this.userService.getUserId();
  public user: User | undefined;
  public voucherOfUser: Voucher[] | any = [];
  constructor(
    private API: ApiService,
    private userService: AuthService,
    private toastService: ToastService,
    private exchangePointService: ExchangePointService,
    private cdr: ChangeDetectorRef
  ) {}
  ngOnInit() {
    this.loadUserData();
    this.loadVoucherData();
  }
  loadUserData() {
    this.userService.getUsers().subscribe((users: User[]) => {
      this.user = users.find((user: User) => user._id === this.userId);
      this.voucherOfUser = this.user?.myVoucher;
    });
    this.cdr.detectChanges();
  }
  loadVoucherData() {
    this.API.getVouchers().subscribe((response) => {
      this.vouchers = response;
    });
    this.cdr.detectChanges();
  }
  reloadData(): void {
    this.loadUserData();
    this.loadVoucherData();
  }
  exchangePoint(voucherId: string, exchangeValue: number) {
    const confirmExchange = confirm('Bạn có chắc chắn muốn đổi voucher này?');
    const pointOfUser: number | any = this.user?.point;
    const voucherOfUser: any = this.user?.myVoucher;
    const checkExistVoucher = voucherOfUser?.includes(
      voucherOfUser.find((voucher: Voucher) => voucher._id === voucherId)
    );
    if (!confirmExchange) {
      return;
    }
    const voucher = this.vouchers.find(
      (voucher: Voucher) => voucher._id === voucherId
    );
    if (voucher?.quantityExchanged === voucher?.limitQuantity) {
      this.toastService.showToast('Voucher đã hết', 'error');
      return;
    }
    if (checkExistVoucher) {
      this.toastService.showToast('Bạn đã đổi voucher này rồi', 'error');
      return;
    }
    if (pointOfUser < exchangeValue) {
      this.toastService.showToast(
        'Bạn không đủ điểm để đổi voucher này',
        'error'
      );
      return;
    }
    if (pointOfUser >= exchangeValue) {
      this.exchangePointService
        .exchangeVoucher(voucherId, this?.userId)
        .subscribe(() => {
          this.toastService.showToast('Đổi voucher thành công', 'success');
          this.reloadData();
        });
      return;
    }
  }
}
