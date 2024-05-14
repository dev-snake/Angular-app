import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { User } from '../../../../interface';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;
  userFound: boolean = false;
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
    this.authService.getUsers().subscribe((db) => {
      const { username, password } = this.loginForm.value;
      db.forEach((user: User) => {
        if (user.username === username && user.password === password) {
          this.userFound = true;
          this.authService.saveLoginFromLocalStorage(user.username);
          this.router.navigate(['/']);
        }
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
    });
  }
}
