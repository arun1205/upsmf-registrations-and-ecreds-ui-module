import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DasboardComponent } from './dasboard/dasboard.component';

const routes: Routes = [
  {
    path: 'dashboard', component: DasboardComponent, pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperAdminManagementRoutingModule { }
