import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ExchangePointService {
  constructor(private http: HttpClient) {}
  exchangeVoucher(voucherId: string, userId: string): Observable<any> {
    return this.http.post('http://localhost:3000/vouchers/exchange-voucher', {
      voucherId,
      userId,
    });
  }
}
