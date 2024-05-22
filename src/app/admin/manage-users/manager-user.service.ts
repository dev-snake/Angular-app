import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../interface';
@Injectable({
  providedIn: 'root',
})
export class ManagerUserService {
  constructor(private http: HttpClient) {}
  getUsers(): Observable<User> {
    return this.http.get<User>('http://localhost:3000/users');
  }
  lockUser(userId: string): Observable<User> {
    return this.http.put<User>(
      `http://localhost:3000/users/${userId}/lock`,
      {}
    );
  }
  unlockUser(userId: string): Observable<User> {
    return this.http.put<User>(
      `http://localhost:3000/users/${userId}/unlock`,
      {}
    );
  }
}
