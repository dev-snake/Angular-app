import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
export interface Message {
  type: 'WARNING' | 'ERROR' | 'SUCCESS' | 'INFO' | 'DEFAULT';
  text: string;
}
@Injectable({
  providedIn: 'root',
})
export class MessageServiceService {
  private messageSource = new Subject<Message>();
  message$ = this.messageSource.asObservable();
  addError(text: string) {
    this.messageSource.next({ type: 'ERROR', text });
  }
  addWarning(text: string) {
    this.messageSource.next({ type: 'WARNING', text });
  }
  constructor() {}
}
