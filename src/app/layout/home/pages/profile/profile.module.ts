import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile-routing.module';
import { AccountComponent } from './account/account.component';

@NgModule({
  declarations: [],
  imports: [CommonModule, ProfileRoutingModule, AccountComponent],
})
export class ProfileModule {}
