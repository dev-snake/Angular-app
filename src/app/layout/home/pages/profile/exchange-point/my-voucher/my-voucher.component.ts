import { Component, Input } from '@angular/core';
import { Voucher } from '../../../../../../shared/interfaces/voucher';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../../../../shared/service/toast/toast.service';
@Component({
  selector: 'app-my-voucher',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-voucher.component.html',
  styleUrl: './my-voucher.component.css',
})
export class MyVoucherComponent {
  @Input() vouchers: Voucher[] = [];
  constructor(private toastService: ToastService) {}
  copyCode(code: string) {
    navigator.clipboard.writeText(code);
    this.toastService.showToast('Đã sao chép mã', 'success');
  }
}
