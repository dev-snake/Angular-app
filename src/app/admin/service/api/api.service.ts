import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, Category } from '../../../shared/interfaces/interface';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:3000/users');
  }
  getProducts(): Observable<any> {
    return this.http.get('http://localhost:3000/data');
  }
  getCategories(): Observable<Category> {
    return this.http.get<Category>('http://localhost:3000/categories');
  }
  getOrders(): Observable<any> {
    return this.http.get('http://localhost:3000/order');
  }
}
