import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, Products, Order } from '../../interface';
@Injectable({
  providedIn: 'root',
})
export class CartApiService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'my-auth-token',
    }),
  };
  public storageKey = 'cart';
  public carts: Products[] = [];
  constructor(private http: HttpClient) {
    this.loadCartFromLocalStorage();
  }
  private loadCartFromLocalStorage() {
    const savedCart = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    this.carts = savedCart;
  }
  private saveCartToLocalStorage() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.carts));
  }
  addToCart(product: Products, quantity: number) {
    const existingItem = this.carts.find((cart) => cart._id === product._id);
    if (existingItem) {
      existingItem.quantity = (existingItem.quantity ?? 0) + quantity || 1;
    } else {
      this.carts.push({ ...product, quantity: quantity || 1 });
    }
    this.saveCartToLocalStorage();
  }

  getItems() {
    return this.carts;
  }
  deleteItemCart(_id: string) {
    this.carts = this.carts.filter((cart) => cart._id !== _id);
    this.saveCartToLocalStorage();
    return this.carts;
  }
  updateQuantity(_id: string, quantity: number) {
    const existingItem = this.carts.find((cart) => cart._id === _id);
    if (existingItem) {
      if (quantity <= 0) {
        this.carts = this.carts.filter((cart) => cart._id !== _id);
      } else {
        existingItem.quantity = quantity;
      }
    }
    this.saveCartToLocalStorage();
    return this.carts;
  }
  createOrder(order: any): Observable<any> {
    return this.http.post('http://localhost:3000/create-order', order);
  }
  getOrders(): Observable<any> {
    return this.http.get('http://localhost:3000/orders');
  }
}
