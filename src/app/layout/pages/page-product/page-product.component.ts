import { Component, OnInit } from '@angular/core';
import { Products } from '../../../interface';
import { Category } from '../../../interface';
import { RouterLink } from '@angular/router';
import { CartApiService } from '../../../service/cart/cart.api.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../service/api/api.service';
import { ToastService } from '../../../service/toast/toast.service';
@Component({
  selector: 'app-page-product',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './page-product.component.html',
  styleUrl: './page-product.component.css',
})
export class PageProductComponent implements OnInit {
  public renderList: Products[] = [];
  public category: Category[] = [];
  public dataFilter: Products[] = [];
  public queryFiter: string | null = null;
  public mechanical_keyboard: Products[] = [];
  public mouse: Products[] = [];
  public mouse_pads: Products[] = [];
  public otherAccessories: Products[] = [];
  constructor(
    private cartService: CartApiService,
    private route: ActivatedRoute,
    private api: ApiService,
    private toastService: ToastService
  ) {}
  addToCart(product: Products, quantity: number) {
    this.cartService.addToCart(product, quantity);
    this.toastService.showToast('Đã thêm vào giỏ hàng', '#17c964');
  }
  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      this.api.getProducts().subscribe((products: Products[]) => {
        this.dataFilter = products.filter((product: Products) => {
          return product.category === Number(params.get('filter'));
        });
        this.queryFiter = params.get('filter');
      });
    });
    this.api
      .getProducts()
      .subscribe(
        (products: Products[]) => (this.renderList = products.slice(0, 10))
      );
    this.api.getCategories().subscribe((categories: Category[]) => {
      this.category = categories;
    });
    this.getProductsKeyboard();
    this.getProductsMouse();
    this.getProductsMousePads();
    this.getOtherAccs();
  }
  getProductsKeyboard() {
    this.api.getProductCategoryKeyboard().subscribe((products: Products[]) => {
      this.mechanical_keyboard = products;
    });
    return this.mechanical_keyboard;
  }
  getProductsMouse() {
    return this.api
      .getProductCategoryMouse()
      .subscribe((products: Products[]) => {
        this.mouse = products;
      });
  }
  getProductsMousePads() {
    return this.api
      .getProductCategoryMousePads()
      .subscribe((products: Products[]) => {
        this.mouse_pads = products;
      });
  }
  getOtherAccs() {
    return this.api.getOtherAccs().subscribe((products: Products[]) => {
      this.otherAccessories = products;
    });
  }
}
