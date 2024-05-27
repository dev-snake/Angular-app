import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../service/auth/auth.service';
import {
  FormControl,
  ReactiveFormsModule,
  FormGroup,
  Validators,
} from '@angular/forms';
import { User } from '../../../../interface';
import { ToastService } from '../../../../service/toast/toast.service';
@Component({
  selector: 'app-personal-information',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './personal-information.component.html',
  styleUrl: './personal-information.component.css',
})
export class PersonalInformationComponent {
  public user: User | any;
  public updateAccount: FormGroup;
  constructor(
    private apiAuth: AuthService,
    private toastService: ToastService
  ) {
    this.updateAccount = new FormGroup({
      lastname: new FormControl(this.user?.username, [Validators.required]),
      firstname: new FormControl('', [Validators.required]),
      sex: new FormControl('', [Validators.required]),
      phonenumber: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      day: new FormControl(Number, [Validators.required]),
      month: new FormControl('', [Validators.required]),
      years: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
    });
    this.apiAuth.getUsers().subscribe((users: User[]) => {
      this.user = users.find(
        (user: User) => user.username === this.apiAuth.getUsername()
      );
      if (this.user) {
        this.updateAccount.patchValue({
          lastname: this.user.lastname,
          firstname: this.user.firstname,
          sex: this.user.sex,
          phonenumber: this.user.phonenumber,
          email: this.user.email,
          address: this.user.address,
          day: this.user.day || '',
          month: this.user.month || '',
          years: this.user.years || '',
        });
      }
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
  updateUser() {
    if (this.updateAccount.invalid) {
      return;
    }
    console.log(this.updateAccount.value);
    this.apiAuth
      .updateAccount(this.updateAccount.value, this.user._id)
      .subscribe((user: User) => {
        console.log(user);
        this.toastService.showToast('Cập nhật thành công', '#17c964');
      });
  }
}
