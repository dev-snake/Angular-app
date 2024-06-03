import { Component } from '@angular/core';
import { Products } from '../../../../shared/interfaces/product';
import { CartApiService } from '../../../../shared/service/cart/cart.api.service';
import { RouterLink } from '@angular/router';
import { VoucherComponent } from './voucher/voucher.component';
import { ApiService } from '../../../../shared/service/api/api.service';
import { ToastService } from '../../../../shared/service/toast/toast.service';
import { Voucher } from '../../../../shared/interfaces/voucher';
@Component({
  selector: 'app-page-cart',
  standalone: true,
  imports: [RouterLink, VoucherComponent],
  templateUrl: './page-cart.component.html',
  styleUrl: './page-cart.component.css',
})
export class PageCartComponent {
  public test: string | any = [];
  private storageKey: string = 'cart';
  public carts: Products[] = [];
  public total: number = 0;
  public discount: number = 0;
  public discountRate: string = '';

  constructor(
    private cartService: CartApiService,
    private apiService: ApiService,
    private toastService: ToastService
  ) {
    this.carts = this.cartService.getItems();
    this.loadCartFromLocalStorage();
    this.calculateTotal();
  }
  private loadCartFromLocalStorage() {
    const savedCart = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    this.carts = savedCart;
  }
  calculateTotal() {
    this.total = this.carts.reduce(
      (acc, curr) => acc + curr.price * (curr.quantity ?? 0),
      0
    );
  }
  deleteItemCart(_id: string) {
    this.cartService.deleteItemCart(_id);
    this.loadCartFromLocalStorage();
    this.calculateTotal();
  }
  updateQuantity(_id: string, quantity: number) {
    this.cartService.updateQuantity(_id, quantity);
    this.loadCartFromLocalStorage();
    this.calculateTotal();
  }
  applyCoupon(coupon: string | number) {
    if (coupon === '') {
      this.toastService.showToast('Vui lòng nhập mã giảm giá', 'error');
      return;
    }
    this.apiService.getVouchers().subscribe((vouchers) => {
      const voucher: any = vouchers.find((v) => v.code === coupon);

      console.log(voucher.quantityUsed, voucher.limitQuantity);
      if (voucher.quantityUsed >= voucher.limitQuantity) {
        this.toastService.showToast('Coupon đã hết lượt sử dụng', 'error');
        return;
      } else {
        this.discount =
          this.total - (this.total * parseInt(voucher.discount)) / 100;
        this.discountRate = voucher.discount;
        localStorage.setItem(
          'discount',
          JSON.stringify({
            rate: this.discountRate,
            amount: this.discount,
            code: coupon,
          })
        );
        return;
      }
    });
  }
}
