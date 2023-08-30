import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminManagementRoutingModule } from './admin-management-routing.module';
import { ManageClaimComponent } from './components/manage-claim/manage-claim.component';
import { ViewClaimListComponent } from './components/view-claim-list/view-claim-list.component';
import { SharedModule } from '../shared';
import { MaterialModule } from 'src/app/material/material.module';


@NgModule({
  declarations: [
    ManageClaimComponent,
    ViewClaimListComponent
  ],
  imports: [
    CommonModule,
    AdminManagementRoutingModule,
    SharedModule,
    MaterialModule
  ]
})
export class AdminManagementModule { }
