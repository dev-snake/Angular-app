import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ManagerUserService } from './manager-user.service';
import { User } from '../../interface';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-manage-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manage-users.component.html',
  styleUrl: './manage-users.component.css',
})
export class ManageUsersComponent implements OnInit {
  @ViewChild('active') active: ElementRef | undefined;
  users: any;
  constructor(private managerUserService: ManagerUserService) {}
  ngOnInit(): void {
    this.getUser();
  }
  getUser() {
    this.managerUserService.getUsers().subscribe((user) => {
      this.users = user;
      console.log(this.users);
    });
  }
  lockUser(userId: string) {
    this.managerUserService.lockUser(userId).subscribe((user) => {
      this.getUser();
    });
  }
  unlockUser(userId: string) {
    this.managerUserService.unlockUser(userId).subscribe((user) => {
      this.getUser();
    });
  }
}
