import { Component } from '@angular/core';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css',
})
export class BannerComponent {
  urlImage = {
    bannerHome: '../../assets/images/keyboard1.png',
    bannerChild: '../../assets/images/banner.png',
  };
}
