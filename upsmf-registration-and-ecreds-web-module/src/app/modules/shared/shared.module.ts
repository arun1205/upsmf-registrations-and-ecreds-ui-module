import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedTableComponent } from './components/shared-table/shared-table.component';
import { HeaderComponent } from './components/header/header.component';
import { SharedSkeletonLoadingComponent } from './components/shared-skeleton-loading/shared-skeleton-loading.component';
import { MaterialModule } from '../../../app/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';

import { ConfigService } from './services/config/config.service';
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
    
  ],
  providers: [ConfigService]
})
export class SharedModule { }
