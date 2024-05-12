import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Products } from '../../../products';
import { AppRootService } from '../../../app-root.service';
import { CartService } from '../page-cart/cart.service';
@Component({
  selector: 'app-page-detail',
  standalone: true,
  imports: [],
  templateUrl: './page-detail.component.html',
  styleUrl: './page-detail.component.css',
})
export class PageDetailComponent implements OnInit {
  urlImage = '../../assets/images/m1wden.png';
  product: Products | undefined;
  message: string = 'Đã thêm vào giỏ hàng';
  constructor(
    private route: ActivatedRoute,
    private data: AppRootService,
    private cartService: CartService
  ) {
    const routeParams = this.route.snapshot.paramMap;
    const productIdFromRoute = String(routeParams.get('productId'));
    this.data.getProducts().subscribe((products: any) => {
      this.product = products.find(
        (product: Products) => product._id === productIdFromRoute
      );
      console.log(this.product);
    });
  }
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

  ngOnInit(): void {}
}
