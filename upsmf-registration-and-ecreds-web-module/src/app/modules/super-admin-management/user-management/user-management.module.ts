import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserManagementRoutingModule } from './user-management-routing.module';
import { ManageUsersComponent } from './components/manage-users/manage-users.component';

import { SharedModule } from '../../shared/shared.module';
import { MaterialModule } from '../../../material/material.module';
import { AddUserComponent } from './components/add-user/add-user.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ManageUsersComponent,
    AddUserComponent
  ],
  imports: [
    CommonModule,
    UserManagementRoutingModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class UserManagementModule { }
