import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageUsersComponent } from './components/manage-users/manage-users.component';
import { AddUserComponent } from './components/add-user/add-user.component';

const routes: Routes = [

  {
    path: 'manage', component: ManageUsersComponent, pathMatch: 'full',
  },
  {
    path: 'new', component: AddUserComponent, pathMatch: 'full',
  },

  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagementRoutingModule { }
