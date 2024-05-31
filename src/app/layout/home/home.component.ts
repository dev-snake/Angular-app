import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/service/api/api.service';
import { Products } from '../../shared/interfaces/interface';
import { BannerComponent } from '../banner/banner.component';
import { RouterLink } from '@angular/router';
import { ProductsComponent } from '../products/products.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BannerComponent, RouterLink, ProductsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(private apiService: ApiService) {}
  products: Products[] = [];
  ngOnInit() {
    this.apiService.getProducts().subscribe((products: Products[]) => {
      this.products = products.slice(0, 10);
    });
  }
}
