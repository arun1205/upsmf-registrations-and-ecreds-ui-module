import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserAuthenticationRoutingModule } from './user-authentication-routing.module';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from 'src/app/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SelfRegistrationComponent } from './components/self-registration/self-registration.component';
import { PasswordPageComponent } from './components/password-page/password-page.component';


@NgModule({
  declarations: [
    LoginPageComponent,
    SelfRegistrationComponent,
    PasswordPageComponent
  ],
  imports: [
    CommonModule,
    UserAuthenticationRoutingModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class UserAuthenticationModule { }
