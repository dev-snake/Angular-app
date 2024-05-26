import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api/api.service';
import { Products } from '../../interface';
import { BannerComponent } from '../banner/banner.component';
import { RouterLink } from '@angular/router';
import { CartApiService } from '../../service/cart/cart.api.service';
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
    private cartService: CartApiService
  ) {}
  message: string = 'Đã thêm vào giỏ hàng';
  products: Products[] = [];
  addToCart(products: Products) {
    this.cartService.addToCart(products);
    const messageDiv = document.createElement('div');
    messageDiv.textContent = this.message;
    messageDiv.style.position = 'fixed';
    messageDiv.style.top = '4rem';
    messageDiv.style.right = '4rem';
    messageDiv.style.backgroundColor = '#17c964';
    messageDiv.style.color = 'white';
    messageDiv.style.padding = '10px';
    messageDiv.style.borderRadius = '1rem';
    messageDiv.style.transition = 'all 0.5s ease-in-out';
    messageDiv.style.fontWeight = '500';
    messageDiv.style.fontFamily = 'Quicksand, sans-serif';
    document.body.appendChild(messageDiv);
    setTimeout(() => {
      messageDiv.remove();
    }, 1000);
  }
  ngOnInit() {
    this.apiService.getProducts().subscribe((products: Products[]) => {
      this.products = products.slice(0, 10);
    });
  }
}
