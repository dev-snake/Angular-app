import { Component, ElementRef, ViewChild, HostListener } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../service/auth/auth.service';
import { ApiService } from '../../service/api/api.service';
import { Products } from '../../interface';
import { DataService } from '../../service/data/data.service';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  @ViewChild('showToast') showToast!: ElementRef;
  @ViewChild('Tab') Tab!: ElementRef;
  @ViewChild('icon_home') icon_home!: ElementRef;
  @ViewChild('tab_products') tab_products!: ElementRef;
  @ViewChild('icon_keyboard') icon_keyboard!: ElementRef;
  @ViewChild('showSearch') showSearch!: ElementRef;
  public searchValue: Products[] = [];
  constructor(
    private authService: AuthService,
    private route: Router,
    private api: ApiService,
    private data: DataService
  ) {}
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    this.showToast.nativeElement.classList.add('hidden');
    this.showSearch.nativeElement.classList.add('hidden');
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
  activeTabHome(): void {
    this.Tab.nativeElement.classList.add('text-blue-500');
    this.icon_home.nativeElement.classList.add('text-blue-500');
    this.tab_products.nativeElement.classList.remove('text-blue-500');
    this.icon_keyboard.nativeElement.classList.remove('text-blue-500');
  }
  activeTabProducts(): void {
    this.tab_products.nativeElement.classList.add('text-blue-500');
    this.icon_keyboard.nativeElement.classList.add('text-blue-500');
    this.Tab.nativeElement.classList.remove('text-blue-500');
    this.icon_home.nativeElement.classList.remove('text-blue-500');
  }
  toggleSearch() {
    this.showSearch.nativeElement.classList.toggle('hidden');
  }
  sendDatatoService(keyword: string) {
    this.api.getProducts().subscribe((products: Products[]) => {
      this.searchValue = products.filter((product) =>
        product.name.toLowerCase().includes(keyword.toLowerCase())
      );
      this.data.changeMessage(this.searchValue);
    });
    this.route.navigate(['/search']);
  }
}
