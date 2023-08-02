import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageClaimsComponent } from './modules/claims-management/components/manage-claims/manage-claims.component';
const routes: Routes = [
  {
    path: '', component:ManageClaimsComponent, pathMatch: 'full',
  },
  {
    path: 'claims', loadChildren :()=> import('./modules/claims-management/claims-management.module').then(m=>m.ClaimsManagementModule)
  },
  {
    path:'authentication', loadChildren :()=>import('./modules/user-authentication/user-authentication.module').then(m=>m.UserAuthenticationModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
