import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../../../interface';
@Injectable({
  providedIn: 'root',
})
export class PageProductService {
  constructor(private http: HttpClient) {}
  getProductCategoryOne(): Observable<any> {
    return this.http.get(`http://localhost:3000/data/1`);
  }
  getProductCategoryTwo(): Observable<any> {
    return this.http.get(`http://localhost:3000/data/2`);
  }
  getProductCategoryThree(): Observable<any> {
    return this.http.get(`http://localhost:3000/data/3`);
  }
  getProductCategoryFour(): Observable<any> {
    return this.http.get(`http://localhost:3000/data/4`);
  }
  getCategories(): Observable<Category> {
    return this.http.get<Category>(`http://localhost:3000/categories`);
  }
}
