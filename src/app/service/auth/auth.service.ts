import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../interface';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'my-auth-token',
    }),
  };
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
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`http://localhost:3000/users`);
  }
  register(user: User): Observable<User> {
    return this.http.post<User>(
      'http://localhost:3000/users',
      this.httpOptions
    );
  }
  postComment(data: any): Observable<any> {
    return this.http.post('http://localhost:3000/comments', this.httpOptions);
  }
}
