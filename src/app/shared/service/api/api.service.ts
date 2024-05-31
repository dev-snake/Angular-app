import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Products } from '../../interfaces/product';
import { Category } from '../../interfaces/category';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'my-auth-token',
    }),
  };

  constructor(private http: HttpClient) {}
  getProducts(): Observable<Products[]> {
    return this.http.get<Products[]>('http://localhost:3000');
  }
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`http://localhost:3000/categories`);
  }
  getOrders(): Observable<any> {
    return this.http.get('http://localhost:3000/order');
  }
  getProductCategoryKeyboard(): Observable<Products[]> {
    return this.http.get<Products[]>(`http://localhost:3000/data/1`);
  }
  getProductCategoryMouse(): Observable<Products[]> {
    return this.http.get<Products[]>(`http://localhost:3000/data/2`);
  }
  getProductCategoryMousePads(): Observable<Products[]> {
    return this.http.get<Products[]>(`http://localhost:3000/data/3`);
  }
  getOtherAccs(): Observable<Products[]> {
    return this.http.get<Products[]>(`http://localhost:3000/data/4`);
  }
  updateProduct(product: Products): Observable<Products[]> {
    return this.http.put<Products[]>(
      `http://localhost:3000/data/${product._id}`,
      this.httpOptions
    );
  }
  increaseView(productId: string): Observable<Products[]> {
    return this.http.get<Products[]>(
      `http://localhost:3000/increaseViews/${productId}`
    );
  }
}
