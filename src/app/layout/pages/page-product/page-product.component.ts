import { Component } from '@angular/core';
import { AppRootService } from '../../../app-root.service';
import { Products } from '../../../interface';
import { Category } from '../../../interface';
import { RouterLink } from '@angular/router';
import { CartService } from '../page-cart/cart.service';
@Component({
  selector: 'app-page-product',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './page-product.component.html',
  styleUrl: './page-product.component.css',
})
export class PageProductComponent {
  data: Products[] = [];
  categrory: Category[] = [];
  message: string = 'Đã thêm vào giỏ hàng';
  constructor(
    private pageProductService: AppRootService,
    private cartService: CartService
  ) {}
  addToCart(product: Products) {
    this.cartService.addToCart(product);
    const messageDiv = document.createElement('div');
    messageDiv.textContent = this.message;
    messageDiv.style.position = 'fixed';
    messageDiv.style.top = '4rem';
    messageDiv.style.right = '4rem';
    messageDiv.style.backgroundColor = '#18c964';
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
    this.pageProductService
      .getProducts()
      .subscribe((data: any) => (this.data = data));
    this.pageProductService.getCategories().subscribe((data: any) => {
      this.categrory = data;
      console.log(data);
    });
  }
}
