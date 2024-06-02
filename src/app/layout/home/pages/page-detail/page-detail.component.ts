import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Products } from '../../../../shared/interfaces/product';
import { Comment } from '../../../../shared/interfaces/comment';
import { CartApiService } from '../../../../shared/service/cart/cart.api.service';
import { ApiService } from '../../../../shared/service/api/api.service';
import { ToastService } from '../../../../shared/service/toast/toast.service';
import { CommentsComponent } from './comments/comments.component';
import { FeedbackComponent } from './feedback/feedback.component';

import { AuthService } from '../../../../shared/service/auth/auth.service';
@Component({
  selector: 'app-page-detail',
  standalone: true,
  imports: [RouterLink, CommentsComponent, FeedbackComponent],
  templateUrl: './page-detail.component.html',
  styleUrl: './page-detail.component.css',
})
export class PageDetailComponent implements OnInit {
  public isLogged: boolean = this.authService.isLoggedIn();
  public product: Products | any = {};
  public message: string = 'Đã thêm vào giỏ hàng';
  public commentList: Comment[] = [];
  constructor(
    private route: ActivatedRoute,
    private cartService: CartApiService,
    private authService: AuthService,
    private apiProducts: ApiService,
    private toastService: ToastService
  ) {
    const routeParams = this.route.snapshot.paramMap;
    const productIdFromRoute = String(routeParams.get('productId'));
    this.apiProducts.getProducts().subscribe((products: Products[]) => {
      this.product = products.find(
        (product: Products) => product._id === productIdFromRoute
      );
      this.apiProducts.increaseView(this.product?._id as string).subscribe();
      if (this.product) {
        this.commentList = this.product.comments;
      }
    });
  }

  addToCart(product: Products, quantity: number) {
    if (quantity < 1) {
      this.toastService.showToast('Thêm tối thiểu một sản phẩm ', '#ff0000');
      return;
    }
    this.cartService.addToCart(product, quantity);
    this.toastService.showToast('Đã thêm vào giỏ hàng', '#17c964');
  }
  addComment(comment: string) {
    this.apiProducts.getProducts().subscribe((products: Products[]) => {
      this.product = products.find(
        (product: Products) => product._id === this.product._id
      );
      if (this.product) {
        this.product.comments.push({
          username_customer: this.authService.getUsername(),
          content: comment,
          date: new Date().toLocaleString(),
        });
        this.apiProducts.updateProduct(this.product).subscribe((res) => {
          this.commentList = this.product.comments;
        });
      }
    });
  }
  ngOnInit(): void {}
}
