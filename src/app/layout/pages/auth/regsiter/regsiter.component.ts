import { Component, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  ReactiveFormsModule,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { User } from '../../../../interface';
@Component({
  selector: 'app-regsiter',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './regsiter.component.html',
  styleUrl: './regsiter.component.css',
})
export class RegsiterComponent {
  message: string = 'Vui lòng nhập đầy đủ thông tin';
  messageExist: string = 'Username hoặc email đã tồn tại';
  messageSuccess: string = 'Đăng ký thành công';
  registerForm: FormGroup;
  constructor(private auth: AuthService, private router: Router) {
    this.registerForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      const messageDiv = document.createElement('div');
      messageDiv.textContent = this.message;
      messageDiv.style.position = 'fixed';
      messageDiv.style.top = '5rem';
      messageDiv.style.right = '4rem';
      messageDiv.style.backgroundColor = '#ff0000';
      messageDiv.style.color = 'white';
      messageDiv.style.padding = '10px';
      messageDiv.style.borderRadius = '1rem';
      messageDiv.style.transition = 'all 0.5s ease-in-out';
      messageDiv.style.fontWeight = '500';
      messageDiv.style.fontFamily = 'Quicksand, sans-serif';
      document.body.appendChild(messageDiv);
      setTimeout(() => {
        messageDiv.remove();
      }, 1000);
      return;
    }
    this.auth.getUsers().subscribe((Exits) => {
      const { username, email } = this.registerForm.value;
      const checkExits = Exits.find(
        (exist: User) => exist.username === username || exist.email === email
      );
      if (checkExits) {
        const messageDiv = document.createElement('div');
        messageDiv.textContent = this.messageExist;
        messageDiv.style.position = 'fixed';
        messageDiv.style.top = '5rem';
        messageDiv.style.right = '4rem';
        messageDiv.style.backgroundColor = '#ff0000';
        messageDiv.style.color = 'white';
        messageDiv.style.padding = '10px';
        messageDiv.style.borderRadius = '1rem';
        messageDiv.style.transition = 'all 0.5s ease-in-out';
        messageDiv.style.fontWeight = '500';
        messageDiv.style.fontFamily = 'Quicksand, sans-serif';
        document.body.appendChild(messageDiv);
        setTimeout(() => {
          messageDiv.remove();
        }, 1000);
        return;
      }
      this.auth.register(this.registerForm.value).subscribe((res) => {
        const messageDiv = document.createElement('div');
        messageDiv.textContent = this.messageSuccess;
        messageDiv.style.position = 'fixed';
        messageDiv.style.top = '5rem';
        messageDiv.style.right = '4rem';
        messageDiv.style.backgroundColor = '#17c964';
        messageDiv.style.color = 'white';
        messageDiv.style.padding = '10px';
        messageDiv.style.borderRadius = '1rem';
        messageDiv.style.transition = 'all 0.5s ease-in-out';
        messageDiv.style.fontWeight = '500';
        messageDiv.style.fontFamily = 'Quicksand, sans-serif';
        document.body.appendChild(messageDiv);
        setTimeout(() => {
          messageDiv.remove();
        }, 1000);
        this.router.navigate(['/login']);
        return;
      });
    });
  }
}
