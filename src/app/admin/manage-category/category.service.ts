import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category, Products } from '../../interface';
@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>('http://localhost:3000/categories');
  }
  addCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(
      'http://localhost:3000/categories',
      category
    );
  }
  deleteCategory(category_id: number): Observable<Category> {
    return this.http.delete<Category>(
      `http://localhost:3000/categories/${category_id}`
    );
  }
  updateCategory(
    category_id: number,
    updateData: Category
  ): Observable<Category> {
    return this.http.put<Category>(
      `http://localhost:3000/categories/${category_id}`,
      updateData
    );
  }
  getProducts(): Observable<Products[]> {
    return this.http.get<Products[]>('http://localhost:3000/data');
  }
}
