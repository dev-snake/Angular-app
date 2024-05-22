import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../../interface';
@Injectable({
  providedIn: 'root',
})
export class ManageProductService {
  constructor(private http: HttpClient) {}
  getProducts(): Observable<any> {
    return this.http.get('http://localhost:3000/data');
  }

  createProduct(data: any): Observable<any> {
    return this.http.post('http://localhost:3000/data', data);
  }
  updateProduct(id: number, data: any): Observable<any> {
    return this.http.put(`http://localhost:3000/data/${id}`, data);
  }
  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`http://localhost:3000/data/${id}`);
  }
  getCategories(): Observable<Category> {
    return this.http.get<Category>('http://localhost:3000/categories');
  }
}
