import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api/api.service';
import { Products } from '../../interface';
import { BannerComponent } from '../banner/banner.component';
import { RouterLink } from '@angular/router';
import { CartApiService } from '../../service/cart/cart.api.service';
import { ToastService } from '../../service/toast/toast.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BannerComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(
    private apiService: ApiService,
    private cartService: CartApiService,
    private toastService: ToastService
  ) {}
  message: string = 'Đã thêm vào giỏ hàng';
  products: Products[] = [];
  addToCart(products: Products, quantity: number) {
    this.cartService.addToCart(products, quantity);
    this.toastService.showToast(this.message, '#17c964');
  }
  ngOnInit() {
    this.apiService.getProducts().subscribe((products: Products[]) => {
      this.products = products.slice(0, 10);
    });
  }
}
