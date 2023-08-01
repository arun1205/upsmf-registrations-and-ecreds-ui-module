import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageClaimsComponent } from './components/manage-claims/manage-claims.component';
import { ClaimsManagementModuleRoutingModule } from './claims-management-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../../material/material.module';

@NgModule({
  declarations: [
    ManageClaimsComponent
  ],
  imports: [
    CommonModule,
    ClaimsManagementModuleRoutingModule,
    MaterialModule,
    SharedModule
  ]
})
export class ClaimsManagementModule { }
