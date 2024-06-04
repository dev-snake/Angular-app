import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VoucherService } from '../../shared/service/voucher/voucher.service';
import { Voucher } from '../../shared/interfaces/voucher';
import { ToastService } from '../../shared/service/toast/toast.service';
import { AddVoucherComponent } from './add-voucher/add-voucher.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
@Component({
  selector: 'app-manage-voucher',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AddVoucherComponent],
  templateUrl: './manage-voucher.component.html',
  styleUrl: './manage-voucher.component.css',
})
export class ManageVoucherComponent implements OnInit {
  @ViewChild('formVoucher') formVoucher!: ElementRef;
  public discount: string[] = [];
  public vouchers: Voucher[] = [];
  constructor(
    private apiService: VoucherService,
    private toastService: ToastService
  ) {}
  ngOnInit() {
    this.apiService.getVouchers().subscribe((vouchers) => {
      this.vouchers = vouchers;
    });
    for (let i = 10; i <= 100; i += 10) {
      this.discount.push(i.toString() + '%');
    }
  }
  copyCode(code: string) {
    navigator.clipboard.writeText(code);
    this.toastService.showToast('Đã sao chép mã giảm giá', 'success');
  }
  openModal() {
    this.formVoucher.nativeElement.classList.toggle('hidden');
  }

  getVouchers() {
    this.apiService.getVouchers().subscribe((vouchers) => {
      this.vouchers = vouchers;
    });
  }
  addVoucher(voucher: FormGroup) {
    this.apiService
      .createVoucher(voucher.value)
      .subscribe((vouchers: Voucher) => {
        this.toastService.showToast('Voucher đã thêm thành công', 'success');
        this.formVoucher.nativeElement.classList.add('hidden');
        voucher.reset();
        this.getVouchers();
      });
  }
  deleteVoucher(_id: string) {
    const confirmDelete = confirm('Bạn có chắc chắn muốn xóa voucher này?');
    if (confirmDelete) {
      this.apiService.deleteVoucher(_id).subscribe((vouchers: Voucher) => {
        this.toastService.showToast('Voucher đã xóa thành công', 'success');
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
