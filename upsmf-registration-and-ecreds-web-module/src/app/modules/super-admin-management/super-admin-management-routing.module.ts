import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DasboardComponent } from './dasboard/dasboard.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { ManageUsersComponent } from './user-management/components/manage-users/manage-users.component';
import { AddUserComponent } from './user-management/components/add-user/add-user.component';

const routes: Routes = [

  {
    path: '', component: AdminHomeComponent, pathMatch: 'full'
  },
  {
    path: 'dashboard', component: DasboardComponent, pathMatch: 'full',
  },
  {
    path:'user-manage', component:ManageUsersComponent
  },
  {
    path:'new-user', component:AddUserComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperAdminManagementRoutingModule { }
