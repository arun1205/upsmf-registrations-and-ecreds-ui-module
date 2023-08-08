import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedTableComponent } from './shared-table/shared-table.component';
import { HeaderComponent } from './header/header.component';
import { SharedSkeletonLoadingComponent } from './shared-skeleton-loading/shared-skeleton-loading.component';
import { MaterialModule } from '../../../app/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SharedTableComponent,
    HeaderComponent,
    SharedSkeletonLoadingComponent,
   
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    
    
  ],
  exports :
  [
    SharedTableComponent,
    HeaderComponent,
    SharedSkeletonLoadingComponent,
    
  ]
})
export class SharedModule { }
