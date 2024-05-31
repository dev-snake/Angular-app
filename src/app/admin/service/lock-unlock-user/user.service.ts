import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../../shared/interfaces/user';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
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
