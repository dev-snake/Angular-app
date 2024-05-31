import { Component } from '@angular/core';
import { ApiService } from '../../shared/service/api/api.service';
import { Products } from '../../shared/interfaces/product';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  isProductPage: boolean = false;
  isTitlePage: boolean = false;
  constructor(private apiService: ApiService, private route: Router) {}
  products: Products[] = [];
  ngOnInit() {
    this.apiService.getProducts().subscribe((products: Products[]) => {
      this.products = products.slice(0, 10);
    });
    this.route.events.subscribe((val) => {
      if (this.route.url === '/products') {
        this.isTitlePage = false;
        this.isProductPage = false;
      } else {
        this.isProductPage = true;
      }
    });
  }
}
