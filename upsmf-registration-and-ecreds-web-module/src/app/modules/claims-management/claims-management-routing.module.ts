import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageClaimsComponent } from './components/manage-claims/manage-claims.component';

const routes: Routes = [ 
/*   {
    path: 'login', loadChildren :()=> import('../auth-modules/auth-modules.module').then(m=>m.AuthModulesModule)
  }, */
  {
    path: 'manage', component: ManageClaimsComponent, pathMatch: 'full',
  },
/*   {
    path: 'new-ticket', component:GrievanceRaiserFormComponent, pathMatch: 'full',
  },
  {
    path: ':id', component:GrievanceDetailsComponent, pathMatch: 'full',
  }, */

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClaimsManagementModuleRoutingModule { }
