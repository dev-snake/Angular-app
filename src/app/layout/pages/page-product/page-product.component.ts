import { Component, OnInit } from '@angular/core';
import { AppRootService } from '../../../app-root.service';
import { Products } from '../../../interface';
import { Category } from '../../../interface';
import { RouterLink } from '@angular/router';
import { CartService } from '../page-cart/cart.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PageProductService } from './page-product.service';
@Component({
  selector: 'app-page-product',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './page-product.component.html',
  styleUrl: './page-product.component.css',
})
export class PageProductComponent implements OnInit {
  data: Products[] = [];
  categrory: any;
  message: string = 'Đã thêm vào giỏ hàng';
  dataFilter: any;
  queryFiter: any;
  mechanical_keyboard: any;
  mouse: any;
  mouse_pads: any;
  otherAccessories: any;
  constructor(
    private pageProductService: AppRootService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private productClassification: PageProductService
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
    this.route.queryParamMap.subscribe((params) => {
      this.pageProductService.getProducts().subscribe((data: any) => {
        this.dataFilter = data.filter((product: any) => {
          return product.category === Number(params.get('filter'));
        });
        this.queryFiter = params.get('filter');
      });
    });
    this.pageProductService
      .getProducts()
      .subscribe((data: any) => (this.data = data));
    this.productClassification
      .getCategories()
      .subscribe((categories: Category) => {
        this.categrory = categories;
      });
    this.getCategory_One();
    this.getProductsTwo();
    this.getProductsThree();
    this.getProductsFour();
  }
  getCategory_One() {
    this.productClassification
      .getProductCategoryOne()
      .subscribe((data: any) => {
        this.mechanical_keyboard = data;
      });
    return this.mechanical_keyboard;
  }
  getProductsTwo() {
    return this.productClassification
      .getProductCategoryTwo()
      .subscribe((data) => {
        this.mouse = data;
        return data;
      });
  }
  getProductsThree() {
    return this.productClassification
      .getProductCategoryThree()
      .subscribe((data) => {
        this.mouse_pads = data;
        return data;
      });
  }
  getProductsFour() {
    return this.productClassification
      .getProductCategoryFour()
      .subscribe((data) => {
        this.otherAccessories = data;
        return data;
      });
  }
}
