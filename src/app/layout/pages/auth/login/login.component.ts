import { Component } from '@angular/core';
import { AuthService } from '../../../../service/auth/auth.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { User } from '../../../../interface';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  public loginForm: FormGroup;
  public userFound: boolean = false;
  constructor(private authService: AuthService, private router: Router) {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }
  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    this.authService.getUsers().subscribe((users: User[]) => {
      const { username, password } = this.loginForm.value;
      this.userFound = false;
      users.forEach((user: User) => {
        if (user.username === username && user.password === password) {
          this.userFound = true;
          if (user.active === 1) {
            const messageDiv = document.createElement('div');
            messageDiv.textContent = 'Tài khoản của bạn đã bị khóa';
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
          } else if (user.active === 0) {
            this.userFound = true;
            this.authService.saveLoginFromLocalStorage(user.username, user._id);
            this.router.navigate(['/']);
          }
        }
      });
      if (!this.userFound) {
        const messageDiv = document.createElement('div');
        messageDiv.textContent = 'Username hoặc password không đúng';
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
      }
    });
  }
}
