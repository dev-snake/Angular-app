import { Injectable } from '@angular/core';
import { Products } from '../../../products';
@Injectable({
  providedIn: 'root',
})
export class CartService {
  private storageKey = 'cart';
  items: Products[] = [];
  constructor() {
    this.loadCartFromLocalStorage();
  }
  private loadCartFromLocalStorage() {
    const savedCart = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    this.items = savedCart;
  }
  private saveCartToLocalStorage() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.items));
  }
  addToCart(product: Products) {
    const existingItem = this.items.find((item) => item._id === product._id);
    if (existingItem) {
      existingItem.quantity = (existingItem.quantity ?? 0) + 1;
    } else {
      this.items.push({ ...product, quantity: 1 });
    }
    this.saveCartToLocalStorage();
  }

  getItems() {
    return this.items;
  }
  deleteItemCart(_id: string) {
    this.items = this.items.filter((item) => item._id !== _id);
    this.saveCartToLocalStorage();
    return this.items;
  }
}
