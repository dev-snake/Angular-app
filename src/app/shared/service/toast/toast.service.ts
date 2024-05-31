import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor() {}
  showToast(message: string, color: string) {
    const messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    messageDiv.className = `toast ${
      color === '#17c964' ? 'success' : 'error'
    } `;

    document.body.appendChild(messageDiv);
    setTimeout(() => {
      messageDiv.remove();
    }, 1000);
  }
}
