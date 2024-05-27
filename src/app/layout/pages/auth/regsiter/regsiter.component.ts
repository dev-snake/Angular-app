import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  ReactiveFormsModule,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../../service/auth/auth.service';
import { Router } from '@angular/router';
import { User } from '../../../../interface';
import { ToastService } from '../../../../service/toast/toast.service';
@Component({
  selector: 'app-regsiter',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './regsiter.component.html',
  styleUrl: './regsiter.component.css',
})
export class RegsiterComponent {
  public message: string = 'Vui lòng nhập đầy đủ thông tin';
  public messageExist: string = 'Username hoặc email đã tồn tại';
  public messageSuccess: string = 'Đăng ký thành công';
  public registerForm: FormGroup;
  constructor(
    private auth: AuthService,
    private router: Router,
    private toastService: ToastService
  ) {
    this.registerForm = new FormGroup({
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
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
      this.toastService.showToast(this.message, '#ff0000');
      return;
    }
    this.auth.getUsers().subscribe((users: User[]) => {
      const { username, email } = this.registerForm.value;
      const checkExits = users.find(
        (exist: User) => exist.username === username || exist.email === email
      );
      if (checkExits) {
        this.toastService.showToast(this.messageExist, '#ff0000');
        return;
      }
      this.auth.register(this.registerForm.value).subscribe((users: User) => {
        this.toastService.showToast(this.messageSuccess, '#17c964');
        this.router.navigate(['/login']);
        return;
      });
    });
  }
}
