import { Component, ElementRef, ViewChild, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../pages/auth/auth.service';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  @ViewChild('showToast') showToast!: ElementRef;
  constructor(private authService: AuthService) {}
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    this.showToast.nativeElement.classList.add('hidden');
  }
  toggle(): void {
    this.showToast.nativeElement.classList.toggle('hidden');
  }
  logout(): void {
    this.authService.saveLogoutFromLocalStorage();
  }
  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
