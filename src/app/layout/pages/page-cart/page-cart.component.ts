import { Component } from '@angular/core';
import { Products } from '../../../interface';
import { CartService } from './cart.service';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-page-cart',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './page-cart.component.html',
  styleUrl: './page-cart.component.css',
})
export class PageCartComponent {
  private storageKey = 'cart';
  carts: Products[] = [];
  total = 0;
  constructor(private cartService: CartService) {
    this.carts = this.cartService.getItems();
    this.loadCartFromLocalStorage();
    this.calculateTotal();
  }
  private loadCartFromLocalStorage() {
    const savedCart = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    this.carts = savedCart;
  }
  calculateTotal() {
    this.total = this.carts.reduce(
      (acc, curr) => acc + curr.price * (curr.quantity ?? 0),
      0
    );
  }
  deleteItemCart(_id: string) {
    this.cartService.deleteItemCart(_id);
    this.loadCartFromLocalStorage();
    this.calculateTotal();
  }
  updateQuantity(_id: string, quantity: any) {
    this.cartService.updateQuantity(_id, Number(quantity));
    this.loadCartFromLocalStorage();
    this.calculateTotal();
  }
}
