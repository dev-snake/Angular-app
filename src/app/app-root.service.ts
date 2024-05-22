import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Products, Category } from './interface';
@Injectable({
  providedIn: 'root',
})
export class AppRootService {
  constructor(private http: HttpClient) {}
  getProducts(): Observable<Products[]> {
    return this.http.get<Products[]>('http://localhost:3000/data');
  }

  updateProduct(product: Products): Observable<Products[]> {
    return this.http.put<Products[]>(
      `http://localhost:3000/data/${product._id}`,
      product
    );
  }
}
