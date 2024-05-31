import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserService as LOCK_AND_UNLOCK_USER } from '../service/lock-unlock-user/user.service';
import { ApiService } from '../service/api/api.service';
import { User } from '../../shared/interfaces/user';
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
  users: User | any = [];
  constructor(
    private manageUser: LOCK_AND_UNLOCK_USER,
    private apiUser: ApiService
  ) {}
  ngOnInit(): void {
    this.getUser();
  }
  getUser() {
    this.apiUser.getUsers().subscribe((user: User[]) => {
      this.users = user;
    });
  }
  lockUser(userId: string) {
    this.manageUser.lockUser(userId).subscribe((user: User) => {
      this.getUser();
    });
  }
  unlockUser(userId: string) {
    this.manageUser.unlockUser(userId).subscribe((user: User) => {
      this.getUser();
    });
  }
}
