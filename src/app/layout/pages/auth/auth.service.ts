import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  saveLoginFromLocalStorage(username_customer: string, user_id: string) {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('username_customer', username_customer);
    localStorage.setItem('user_id', user_id);
  }
  saveLogoutFromLocalStorage() {
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.setItem('username_customer', '');
    localStorage.setItem('user_id', '');
  }
  getUsername() {
    return localStorage.getItem('username_customer');
  }
  isLoggedIn(): boolean {
    return JSON.parse(localStorage.getItem('isLoggedIn') || 'false');
  }
  getUsers(): Observable<any> {
    return this.http.get(`http://localhost:3000/users`);
  }
  register(data: any): Observable<any> {
    return this.http.post('http://localhost:3000/users', data);
  }
  postComment(data: any): Observable<any> {
    return this.http.post('http://localhost:3000/comments', data);
  }
}
