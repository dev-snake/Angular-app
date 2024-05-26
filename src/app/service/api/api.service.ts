import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, Products, Order, Category } from '../../interface';
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
    return this.http.get<Products[]>('http://localhost:3000/dataLimit');
  }
  getCategories(): Observable<Category> {
    return this.http.get<Category>(`http://localhost:3000/categories`);
  }
  getProductCategoryOne(): Observable<Category> {
    return this.http.get<Category>(`http://localhost:3000/data/1`);
  }
  getProductCategoryTwo(): Observable<Category> {
    return this.http.get<Category>(`http://localhost:3000/data/2`);
  }
  getProductCategoryThree(): Observable<Category> {
    return this.http.get<Category>(`http://localhost:3000/data/3`);
  }
  getProductCategoryFour(): Observable<Category> {
    return this.http.get<Category>(`http://localhost:3000/data/4`);
  }
  updateProduct(product: Products): Observable<Products[]> {
    return this.http.put<Products[]>(
      `http://localhost:3000/data/${product._id}`,
      product
    );
  }
}
