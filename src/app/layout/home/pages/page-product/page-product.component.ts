import { Component, OnInit } from '@angular/core';
import { Products } from '../../../../shared/interfaces/product';
import { Category } from '../../../../shared/interfaces/category';
import { RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../../shared/service/api/api.service';
import { ProductsComponent } from '../../../products/products.component';
@Component({
  selector: 'app-page-product',
  standalone: true,
  imports: [RouterLink, CommonModule, ProductsComponent],
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
  constructor(private route: ActivatedRoute, private api: ApiService) {}

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
  filterProductsKeyboard(event: Event) {
    const value = +(event.target as HTMLSelectElement).value;
    if (value === 0) {
      this.api
        .getProductCategoryKeyboard()
        .subscribe((products: Products[]) => {
          this.mechanical_keyboard = products;
        });
    } else if (value === 1) {
      this.api
        .getProductCategoryKeyboard()
        .subscribe((products: Products[]) => {
          this.mechanical_keyboard = products.sort((a, b) => a.price - b.price);
        });
    } else {
      this.api
        .getProductCategoryKeyboard()
        .subscribe((products: Products[]) => {
          this.mechanical_keyboard = products.sort((a, b) => b.price - a.price);
        });
    }
  }
  filterProductsMouse(event: Event) {
    const value = +(event.target as HTMLSelectElement).value;
    if (value === 0) {
      this.api.getProductCategoryMouse().subscribe((products: Products[]) => {
        this.mouse = products;
      });
    } else if (value === 1) {
      this.api.getProductCategoryMouse().subscribe((products: Products[]) => {
        this.mouse = products.sort((a, b) => a.price - b.price);
      });
    } else {
      this.api.getProductCategoryMouse().subscribe((products: Products[]) => {
        this.mouse = products.sort((a, b) => b.price - a.price);
      });
    }
  }
  filterProductsMousePads(event: Event) {
    const value = +(event.target as HTMLSelectElement).value;
    if (value === 0) {
      this.api
        .getProductCategoryMousePads()
        .subscribe((products: Products[]) => {
          this.mouse_pads = products;
        });
    } else if (value === 1) {
      this.api
        .getProductCategoryMousePads()
        .subscribe((products: Products[]) => {
          this.mouse_pads = products.sort((a, b) => a.price - b.price);
        });
    } else {
      this.api
        .getProductCategoryMousePads()
        .subscribe((products: Products[]) => {
          this.mouse_pads = products.sort((a, b) => b.price - a.price);
        });
    }
  }
}
