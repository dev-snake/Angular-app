import { Component } from '@angular/core';
import { RouterModule, RouterLink, Router } from '@angular/router';
import { User } from '../../../../interface';
import { AuthService } from '../../../../service/auth/auth.service';
import { PersonalInformationComponent } from '../personal-information/personal-information.component';
@Component({
  selector: 'app-account',
  standalone: true,
  imports: [RouterModule, RouterLink, PersonalInformationComponent],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css',
})
export class AccountComponent {
  public getUser: User | undefined;
  constructor(private authService: AuthService, private route: Router) {
    if (this.authService.isLoggedIn()) {
      this.authService.getUsers().subscribe((data) => {
        this.getUser = data.find(
          (user: User) => user.username === this.authService.getUsername()
        );
      });
    }
  }
  logout(): void {
    this.route.navigate(['/']);
    return this.authService.saveLogoutFromLocalStorage();
  }
}
