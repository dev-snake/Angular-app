import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private http: HttpClient) {}
  updateOrderStatus(
    orderId: any,
    state: Number,
    userId: string,
    code: string
  ): Observable<any> {
    return this.http.patch(
      `http://localhost:3000/order/${orderId}/updateStatus?statusValue=${state}`,
      { userId, code },
      this.httpOptions
    );
  }
}
