import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Voucher } from '../../../shared/interfaces/voucher';
@Component({
  selector: 'app-add-voucher',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-voucher.component.html',
  styleUrl: './add-voucher.component.css',
})
export class AddVoucherComponent {
  @Output() public voucherData = new EventEmitter();
  public discount: string[] = [];
  public vouchers: Voucher[] = [];
  public formAddVoucher: FormGroup;
  constructor() {
    this.formAddVoucher = new FormGroup({
      code: new FormControl('', [Validators.required]),
      discount: new FormControl('', [Validators.required]),
      expiredDate: new FormControl('', [Validators.required]),
      limitQuantity: new FormControl('', [Validators.required]),
      // image: new FormControl('', [Validators.required]),
    });
    for (let i = 10; i <= 100; i += 10) {
      this.discount.push(i.toString() + '%');
    }
  }
  generateCode() {
    let code = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 10; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    this.formAddVoucher.controls['code'].setValue(code);
  }

  addVoucher() {
    if (this.formAddVoucher.invalid) {
      return;
    }
    this.voucherData.emit(this.formAddVoucher);
  }
}
