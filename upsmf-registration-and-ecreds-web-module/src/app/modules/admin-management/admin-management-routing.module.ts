import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageClaimComponent } from './components/manage-claim/manage-claim.component';
import { ViewClaimListComponent } from './components/view-claim-list/view-claim-list.component';
import { AdminManageComponent } from './components/admin-manage/admin-manage.component';

const routes: Routes = [
  {
    path: '', component: AdminManageComponent, pathMatch: 'full',
  },
  {
    path: 'manage-claim', component: ManageClaimComponent, pathMatch: 'full',
  },
  {
    path: 'view-claim', component: ViewClaimListComponent, pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminManagementRoutingModule { }
