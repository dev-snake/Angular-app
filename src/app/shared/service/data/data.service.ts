import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Products } from '../../interfaces/product';
@Injectable({
  providedIn: 'root',
})
export class DataService {
  private messageSource = new BehaviorSubject([]);
  currentMessage = this.messageSource.asObservable();
  constructor() {}
  changeMessage(product: Products[]) {
    this.messageSource.next(product as []);
  }
  public satisfactionLevels = [
    {
      id: 1,
      icon: 'fa-solid fa-face-angry',
      lalel: 'Rất tệ',
    },
    {
      id: 2,
      icon: 'fa-solid fa-face-sad-tear',
      lalel: 'Tệ',
    },
    {
      id: 3,
      icon: 'fa-solid fa-face-smile',
      lalel: 'Bình thường',
    },
    {
      id: 4,
      icon: 'fa-solid fa-face-grin-beam',
      lalel: 'Tốt',
    },
    {
      id: 5,
      icon: 'fa-solid fa-face-grin-hearts',
      lalel: 'Rất tốt',
    },
  ];
}
