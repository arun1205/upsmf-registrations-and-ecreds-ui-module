import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './modules/user-authentication/components/login-page/login-page.component';
import { PaymentSuccessFailureComponent } from './payment-success-failure/payment-success-failure.component';


const routes: Routes = [
  // {
  //   path: '', component: LoginPageComponent, pathMatch: 'full'
  // },
  {
    path: '', loadChildren: () => import('./modules/user-authentication/user-authentication.module').then(m => m.UserAuthenticationModule)
  },
  {
    path:'payment-response', component: PaymentSuccessFailureComponent
  },
  {
    path: 'claims', loadChildren: () => import('./modules/claims-management/claims-management.module').then(m => m.ClaimsManagementModule)
  },
  {
    path: 'super-admin', loadChildren: () => import('./modules/super-admin-management/super-admin-management.module').then(m => m.SuperAdminManagementModule)
  },
  {
    path: 'admin', loadChildren: () => import('./modules/admin-management/admin-management.module').then(m => m.AdminManagementModule)
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
