import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageClaimsComponent } from './components/manage-claims/manage-claims.component';
import { NewClaimsMenuComponent } from './components/new-claims-menu/new-claims-menu.component';
import { NewRegnCertificateComponent } from './components/new-regn-certificate/new-regn-certificate.component';
import { NewRegnCertDetailsComponent } from './components/new-regn-cert-details/new-regn-cert-details.component';
import { GoodStandingForeignVerificationComponent } from './components/good-standing-foreign-verification/good-standing-foreign-verification.component';



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
    path: 'good-stand-frgn-cert', component: GoodStandingForeignVerificationComponent, pathMatch: 'full',
  },
  {
    path: 'renew-cert-claim', component: NewClaimsMenuComponent, pathMatch: 'full',
  },
  {
    path: ':id', component: NewRegnCertDetailsComponent, pathMatch: 'full',
  },
  {
    path: 'foreign-goodstanding/:id', component: GoodStandingForeignVerificationComponent, pathMatch: 'full',
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClaimsManagementModuleRoutingModule { }
