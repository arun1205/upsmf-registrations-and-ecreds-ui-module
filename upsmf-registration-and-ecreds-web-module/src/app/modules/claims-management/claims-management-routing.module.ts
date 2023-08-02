import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageClaimsComponent } from './components/manage-claims/manage-claims.component';
import { NewClaimsMenuComponent } from './components/new-claims-menu/new-claims-menu.component';
import { NewRegnCertificateComponent } from './components/new-regn-certificate/new-regn-certificate.component';
import { NewRegnCertDetailsComponent } from './components/new-regn-cert-details/new-regn-cert-details.component';


const routes: Routes = [ 
/*   {
    path: 'login', loadChildren :()=> import('../auth-modules/auth-modules.module').then(m=>m.AuthModulesModule)
  }, */
  {
    path: 'manage', component: ManageClaimsComponent, pathMatch: 'full',
  },
  {
    path: 'new', component: NewClaimsMenuComponent, pathMatch: 'full',
  },
  {
    path: 'new-regn-cert', component: NewRegnCertificateComponent, pathMatch: 'full',
  },
  {
    path: 'new-regn-cert-details', component: NewRegnCertDetailsComponent, pathMatch: 'full',
  },
  {
    path: 'good-stand-cert', component: NewClaimsMenuComponent, pathMatch: 'full',
  },
  {
    path: 'frgn-verify-req', component: NewClaimsMenuComponent, pathMatch: 'full',
  },
  {
    path: 'renew-cert-claim', component: NewClaimsMenuComponent, pathMatch: 'full',
  },

  
 /*  {
    path: ':id', component:GrievanceDetailsComponent, pathMatch: 'full',
  }, */

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClaimsManagementModuleRoutingModule { }
