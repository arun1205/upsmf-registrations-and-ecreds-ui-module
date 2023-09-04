import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuperAdminManagementRoutingModule } from './super-admin-management-routing.module';
import { DasboardComponent } from './dasboard/dasboard.component';
import { SharedModule } from '../shared';
import { MaterialModule } from 'src/app/material/material.module';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AddUserComponent } from './user-management/components/add-user/add-user.component';
import { ManageUsersComponent } from './user-management/components/manage-users/manage-users.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DasboardComponent,
    AdminHomeComponent,
    AddUserComponent,
    ManageUsersComponent
  ],
  imports: [
    CommonModule,
    SuperAdminManagementRoutingModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class SuperAdminManagementModule { }
