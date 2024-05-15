import { Component, Input, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-view-order-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-order-details.component.html',
  styleUrl: './view-order-details.component.css',
  schemas: [NO_ERRORS_SCHEMA],
})
export class ViewOrderDetailsComponent {
  @Input() dataOrderDetails?: any[];
  @Input() dataOrderPayment?: any;
  constructor() {}
}
