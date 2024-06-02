import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Voucher } from '../../interfaces/voucher';
@Injectable({
  providedIn: 'root',
})
export class VoucherService {
  constructor(private http: HttpClient) {}
  getVouchers(): Observable<Voucher[]> {
    return this.http.get<Voucher[]>('http://localhost:3000/vouchers');
  }
  createVoucher(voucher: Voucher): Observable<Voucher> {
    return this.http.post<Voucher>('http://localhost:3000/vouchers', voucher);
  }
  deleteVoucher(id: string): Observable<Voucher> {
    return this.http.delete<Voucher>(`http://localhost:3000/vouchers/${id}`);
  }
}
