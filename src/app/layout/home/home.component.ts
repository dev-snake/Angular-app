import { Component, OnInit } from '@angular/core';
import { from, Observable } from 'rxjs';
import { AppRootService } from '../../app-root.service';
import { Products } from '../../interface';
import { BannerComponent } from '../banner/banner.component';
import { RouterLink } from '@angular/router';
import { CartService } from '../pages/page-cart/cart.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BannerComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(
    private homeService: AppRootService,
    private cartService: CartService
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
    // const data = from(
    //   fetch('http://localhost:3000/data').then((response) => response.json())
    // );
    // data.subscribe({
    //   next(response) {
    //     console.log(response);
    //   },
    //   error(err) {
    //     console.log(err);
    //   },
    // });
    this.homeService
      .getProducts()
      .subscribe((data: any) => (this.products = data));
  }
}
