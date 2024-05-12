import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class AppRootService {
  constructor(private http: HttpClient) {}
  getProducts() {
    return this.http.get('http://localhost:3000/data');
  }
  getCategory() {
    return this.http.get('http://localhost:3000/category');
  }
}
