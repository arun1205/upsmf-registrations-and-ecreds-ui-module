import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { SelfRegistrationComponent } from './components/self-registration/self-registration.component';
import { PasswordPageComponent } from './components/password-page/password-page.component';

const routes: Routes = [
  {
    path:'',redirectTo: 'login', pathMatch: 'full'
  },
  {
    path:'login', component: LoginPageComponent
  },
  {
    path:'registration',component:SelfRegistrationComponent,pathMatch: 'full'
  },
  {
    path:'password', component:PasswordPageComponent,pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserAuthenticationRoutingModule { }
