import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  @ViewChild('showToast') showToast!: ElementRef;
  toggle(): void {
    this.showToast.nativeElement.classList.toggle('hidden');
  }
}
