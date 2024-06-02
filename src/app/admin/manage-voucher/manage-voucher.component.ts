import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VoucherService } from '../../shared/service/voucher/voucher.service';
import { Voucher } from '../../shared/interfaces/voucher';
import { ToastService } from '../../shared/service/toast/toast.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
@Component({
  selector: 'app-manage-voucher',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './manage-voucher.component.html',
  styleUrl: './manage-voucher.component.css',
})
export class ManageVoucherComponent implements OnInit {
  @ViewChild('formVoucher') formVoucher!: ElementRef;
  public discount: string[] = [];
  public vouchers: Voucher[] = [];
  public formAddVoucher: FormGroup;
  constructor(
    private apiService: VoucherService,
    private toastService: ToastService
  ) {
    this.formAddVoucher = new FormGroup({
      code: new FormControl('', [Validators.required]),
      discount: new FormControl('', [Validators.required]),
      expiredDate: new FormControl('', [Validators.required]),
    });
  }
  ngOnInit() {
    this.apiService.getVouchers().subscribe((vouchers) => {
      this.vouchers = vouchers;
      console.log(this.vouchers);
    });
    for (let i = 10; i <= 100; i += 10) {
      this.discount.push(i.toString() + '%');
    }
  }
  copyCode(code: string) {
    navigator.clipboard.writeText(code);
    this.toastService.showToast('Đã sao chép mã giảm giá', '#17c964');
  }
  openModal() {
    this.formVoucher.nativeElement.classList.toggle('hidden');
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
  getVouchers() {
    this.apiService.getVouchers().subscribe((vouchers) => {
      this.vouchers = vouchers;
    });
  }
  addVoucher() {
    if (this.formAddVoucher.invalid) {
      return;
    }
    this.apiService
      .createVoucher(this.formAddVoucher.value)
      .subscribe((vouchers: Voucher) => {
        this.toastService.showToast('Voucher đã thêm thành công', '#17c964');
        this.formVoucher.nativeElement.classList.add('hidden');
        this.formAddVoucher.reset();
        this.getVouchers();
      });
  }
  deleteVoucher(_id: string) {
    const confirmDelete = confirm('Bạn có chắc chắn muốn xóa voucher này?');
    if (confirmDelete) {
      this.apiService.deleteVoucher(_id).subscribe((vouchers: Voucher) => {
        this.toastService.showToast('Voucher đã xóa thành công', '#17c964');
        this.getVouchers();
      });
    }
  }
  searchVoucher(discount: Event) {
    const value = (discount.target as HTMLInputElement).value;
    this.apiService.getVouchers().subscribe((vouchers: Voucher[]) => {
      this.vouchers = vouchers.filter((voucher: Voucher) =>
        voucher.discount.includes(value)
      );
    });
  }
}
