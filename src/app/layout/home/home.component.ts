import { Component, OnInit } from '@angular/core';
import { from, Observable } from 'rxjs';
import { AppRootService } from '../../app-root.service';
import { Products } from '../../products';
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
  products: Products[] = [];
  addToCart(products: Products) {
    this.cartService.addToCart(products);
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
