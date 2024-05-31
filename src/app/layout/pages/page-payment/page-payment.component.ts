import { Component } from '@angular/core';
import { Order, Products } from '../../../shared/interfaces/interface';
import { AuthService } from '../../../shared/service/auth/auth.service';
import { User } from '../../../shared/interfaces/interface';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartApiService } from '../../../shared/service/cart/cart.api.service';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { ToastService } from '../../../shared/service/toast/toast.service';
@Component({
  selector: 'app-page-payment',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './page-payment.component.html',
  styleUrl: './page-payment.component.css',
})
export class PagePaymentComponent {
  public user: User | undefined;
  public isLoggedIn: boolean = false;
  public paymentForm!: FormGroup;
  constructor(
    private cartService: CartApiService,
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService
  ) {
    this.authService.getUsers().subscribe((user: User[]) => {
      this.user = user.find(
        (user: User) => user.username === this.authService.getUsername()
      );
      const day = new Date();
      const date = day.getDate();
      const month = day.getMonth();
      const year = day.getFullYear();
      const time = day.getHours();
      const minute = day.getMinutes();
      const second = day.getSeconds();
      const fullTime = `${date}/${month}/${year} ${time}:${minute}:${second}`;
      if (this.user) {
        this.isLoggedIn = true;
        this.paymentForm = new FormGroup({
          firstname: new FormControl(this.user.firstname, [
            Validators.required,
          ]),
          lastname: new FormControl(this.user.lastname, [Validators.required]),
          email: new FormControl(this.user.email, [
            Validators.required,
            Validators.email,
          ]),
          address: new FormControl(this.user.address, [Validators.required]),
          phonenumber: new FormControl(this.user.phonenumber, [
            Validators.required,
          ]),
          paymentMethod: new FormControl('', [Validators.required]),
          date: new FormControl(fullTime, [Validators.required]),
          status: new FormControl(0, [Validators.required]),
        });
      } else {
        this.paymentForm = new FormGroup({
          firstname: new FormControl('', [Validators.required]),
          lastname: new FormControl('', [Validators.required]),
          email: new FormControl('', [Validators.required, Validators.email]),
          address: new FormControl('', [Validators.required]),
          phonenumber: new FormControl('', [Validators.required]),
          paymentMethod: new FormControl('', [Validators.required]),
          date: new FormControl(fullTime, [Validators.required]),
          status: new FormControl(0, [Validators.required]),
        });
      }
    });
  }

  get cartList() {
    return this.cartService.getItems();
  }
  get loggedIn() {
    return this.authService.isLoggedIn();
  }
  get total() {
    return this.cartService
      .getItems()
      .reduce(
        (acc: number, item: Products) => acc + item.price * item.quantity,
        0
      );
  }
  onSubmit() {
    if (this.paymentForm.valid) {
      const order = {
        ...this.paymentForm.value,
        code: '#' + Math.floor(Math.random() * 1000000),
        products: this.cartList,
        total: this.total,
        userId: this.user?._id || null,
        userOrder:
          (this.user?.firstname ?? this.paymentForm?.get('firstname')?.value) +
          ' ' +
          (this.user?.lastname ?? this.paymentForm?.get('lastname')?.value),
      };
      this.cartService.createOrder(order).subscribe((order: Order) => {
        console.log(order);
        this.toastService.showToast('Đặt hàng thành công !', '#17c964');
        this.router.navigate(['/']);
      });
    }
  }
}
