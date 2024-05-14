import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
@Component({
  selector: 'app-page-profile',
  standalone: true,
  imports: [
    OrderHistoryComponent,
    ChangePasswordComponent,
    RouterLink,
    CommonModule,
  ],
  templateUrl: './page-profile.component.html',
  styleUrl: './page-profile.component.css',
})
export class PageProfileComponent {
  isOrderHistory: boolean = true;
  constructor() {}
}
