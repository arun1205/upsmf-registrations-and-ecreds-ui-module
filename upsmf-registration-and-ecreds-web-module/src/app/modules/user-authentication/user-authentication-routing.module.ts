import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { SelfRegistrationComponent } from './components/self-registration/self-registration.component';

const routes: Routes = [
  {
    path:'login',component:LoginPageComponent,pathMatch: 'full'
  },
  {
    path:'registration',component:SelfRegistrationComponent,pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserAuthenticationRoutingModule { }
