import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../../../shared/interfaces/category';
@Injectable({
  providedIn: 'root',
})
export class CrudService {
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
}
