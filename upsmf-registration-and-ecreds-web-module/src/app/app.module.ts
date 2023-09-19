import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from '../../src/app/material/material.module';

import { BaseInterceptorInterceptor } from './services/base-interceptor.interceptor';
import { PaymentSuccessFailureComponent } from './payment-success-failure/payment-success-failure.component';
import { SharedModule } from './modules/shared';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    PaymentSuccessFailureComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    SharedModule
    
  ],
  providers: [ DatePipe,{ provide: HTTP_INTERCEPTORS, useClass: BaseInterceptorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
