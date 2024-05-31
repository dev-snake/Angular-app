import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Products } from '../../interfaces/interface';
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
}
