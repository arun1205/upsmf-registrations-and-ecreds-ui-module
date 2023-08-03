import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DATE_LOCALE} from '@angular/material/core';


import { ManageClaimsComponent } from './components/manage-claims/manage-claims.component';
import { ClaimsManagementModuleRoutingModule } from './claims-management-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../../material/material.module';
import { NewClaimsMenuComponent } from './components/new-claims-menu/new-claims-menu.component';
import { NewRegnCertificateComponent } from './components/new-regn-certificate/new-regn-certificate.component';
import {ReactiveFormsModule } from '@angular/forms';
import { NewRegnCertDetailsComponent } from './components/new-regn-cert-details/new-regn-cert-details.component';
import { GoodStandingForeignVerificationComponent } from './components/good-standing-foreign-verification/good-standing-foreign-verification.component';

@NgModule({
  declarations: [
    ManageClaimsComponent,
    NewClaimsMenuComponent,
    NewRegnCertificateComponent,
    NewRegnCertDetailsComponent,
    GoodStandingForeignVerificationComponent
  ],
  imports: [
    CommonModule,
    ClaimsManagementModuleRoutingModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
  ],
})
export class ClaimsManagementModule { }
