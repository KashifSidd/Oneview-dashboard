import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Page500Component } from './shared/components/page500/page500.component';
import { ToastrModule } from 'ngx-toastr';
import { MaterialModule } from 'src/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Page404Component } from './shared/components/page404/page404.component';
import { HttpRequestInterceptor } from './core/interceptors/http-request-interceptors';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ExceptionHandlerService } from './shared/services/exception-handler.service';

@NgModule({
  declarations: [
    AppComponent,
    Page500Component,
    Page404Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxSpinnerModule,
    ToastrModule.forRoot({
      closeButton:true,
      timeOut:2000,
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor,
      multi: true,
    },
    { provide: ErrorHandler, useClass: ExceptionHandlerService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
