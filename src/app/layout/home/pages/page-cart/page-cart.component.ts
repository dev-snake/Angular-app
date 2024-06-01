import { Component } from '@angular/core';
import { Products } from '../../../../shared/interfaces/product';
import { CartApiService } from '../../../../shared/service/cart/cart.api.service';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-page-cart',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './page-cart.component.html',
  styleUrl: './page-cart.component.css',
})
export class PageCartComponent {
  private storageKey: string = 'cart';
  public carts: Products[] = [];
  public total: number = 0;
  constructor(private cartService: CartApiService) {
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
  updateQuantity(_id: string, quantity: number) {
    this.cartService.updateQuantity(_id, quantity);
    this.loadCartFromLocalStorage();
    this.calculateTotal();
  }
}