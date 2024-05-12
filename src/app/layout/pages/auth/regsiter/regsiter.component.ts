import { Component } from '@angular/core';
import {
  FormControl,
  ReactiveFormsModule,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-regsiter',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './regsiter.component.html',
  styleUrl: './regsiter.component.css',
})
export class RegsiterComponent {
  message: string = 'Vui lòng nhập đầy đủ thông tin';
  messageWrong: string = 'Password phải có ít nhất 6 ký tự';
  messageEmail: string = 'Email không hợp lệ';
  messageSuccess: string = 'Đăng ký thành công';
  registerForm: FormGroup;
  constructor(private auth: AuthService, formBuilder: FormBuilder) {
    this.registerForm = formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit() {
    if (this.registerForm.invalid) {
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
    });
  }
}
