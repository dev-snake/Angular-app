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
  }

  ngOnInit(): void {}
}
