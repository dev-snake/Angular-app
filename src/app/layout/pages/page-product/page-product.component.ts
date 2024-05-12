import { Component } from '@angular/core';
import { AppRootService } from '../../../app-root.service';
import { Products } from '../../../products';
import { Category } from '../../../products';
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
  urlBannerChild = '../../assets/images/banner.png';
  urlBannerParent = '../../assets/images/keyboard1.png';
  data: Products[] = [];
  categrory: Category[] = [];
  constructor(
    private pageProductService: AppRootService,
    private cartService: CartService
  ) {}
  addToCart(product: Products) {
    this.cartService.addToCart(product);
  }
  ngOnInit() {
    this.pageProductService
      .getProducts()
      .subscribe((data: any) => (this.data = data));
    this.pageProductService.getCategory().subscribe((data: any) => {
      this.categrory = data;
      console.log(data);
    });
  }
}
