import { Component } from '@angular/core';
import {
  FormControl,
  ReactiveFormsModule,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-personal-information',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './personal-information.component.html',
  styleUrl: './personal-information.component.css',
})
export class PersonalInformationComponent {
  public updateAccount: FormGroup;
  constructor() {
    this.updateAccount = new FormGroup({
      fullname: new FormControl('', [Validators.required]),
      sex: new FormControl('', [Validators.required]),
      phonenumber: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      day: new FormControl(Number, [Validators.required]),
      month: new FormControl(Number, [Validators.required]),
      years: new FormControl(Number, [Validators.required]),
      date: new FormControl(Number, [Validators.required]),
    });
  }
  getDaysArray(): number[] {
    return Array.from({ length: 31 }, (_, i) => i + 1);
  }
  getMonthsArray(): number[] {
    return Array.from({ length: 12 }, (_, i) => i + 1);
  }
  getYearsArray(): number[] {
    const currentYear = new Date().getFullYear();
    const startYear = 1900;
    return Array.from(
      { length: currentYear - startYear + 1 },
      (_, i) => startYear + i
    );
  }
  public updateUser() {
    console.log(this.updateAccount.value);
  }
}
