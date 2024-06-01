import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-voucher',
  standalone: true,
  imports: [],
  templateUrl: './voucher.component.html',
  styleUrl: './voucher.component.css',
})
export class VoucherComponent {
  @Output() applyVoucher = new EventEmitter<string>();

  applyDiscount(discount: any) {
    this.applyVoucher.emit(discount);
  }
}
