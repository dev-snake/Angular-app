import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Products, Comment } from '../../../interface';
import { CartApiService } from '../../../service/cart/cart.api.service';
import { ApiService } from '../../../service/api/api.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../service/auth/auth.service';
import { HttpParams } from '@angular/common/http';
@Component({
  selector: 'app-page-detail',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './page-detail.component.html',
  styleUrl: './page-detail.component.css',
})
export class PageDetailComponent implements OnInit {
  product: Products | undefined;
  message: string = 'Đã thêm vào giỏ hàng';
  formComment: FormGroup;
  commentList: Comment[] = [];
  constructor(
    private route: ActivatedRoute,
    private cartService: CartApiService,
    private authService: AuthService,
    private apiProducts: ApiService
  ) {
    const routeParams = this.route.snapshot.paramMap;
    const productIdFromRoute = String(routeParams.get('productId'));
    this.apiProducts.getProducts().subscribe((products: any) => {
      this.product = products.find(
        (product: Products) => product._id === productIdFromRoute
      );
      if (this.product) {
        this.commentList = this.product.comments;
      }
    });
    const day = new Date();
    const date = day.getDate();
    const month = day.getMonth();
    const year = day.getFullYear();
    const time = day.getHours();
    const minute = day.getMinutes();
    const second = day.getSeconds();
    const fullTime = `${date}/${month}/${year} ${time}:0${minute}:${second}`;
    this.formComment = new FormGroup({
      username_customer: new FormControl(this.authService.getUsername()),
      content: new FormControl('', [Validators.required]),
      date: new FormControl(fullTime),
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
  onSubmit() {
    const getUrl = new HttpParams().set('productId', this.product?._id || '');
    const productId = getUrl.get('productId');
    this.apiProducts.getProducts().subscribe((products: any) => {
      this.product = products.find(
        (product: Products) => product._id === productId
      );
      if (this.product) {
        this.product?.comments.push(this.formComment.value);
        this.apiProducts.updateProduct(this.product).subscribe((res) => {
          this.commentList = this.product?.comments || [];
        });
      }
    });
  }
  ngOnInit(): void {}
}
