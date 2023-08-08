import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpService } from './services/http-service/http.service';
import { AuthService } from './services/auth-service/auth.service';
import { SharedModule } from '../modules/shared/shared.module';
@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports :
  [
  ],
  providers: [HttpService, AuthService]
})
export class CoreModule { }

