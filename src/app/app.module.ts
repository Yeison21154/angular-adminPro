import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NotpagesfoundComponent } from './pages/notpagesfound/notpagesfound.component';
import { AppRoutingModule } from './app-routing.module';
import { PagesModule } from './pages/pages.module';
import { AuthModule } from './auth/auth.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './Interceptor/interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    NotpagesfoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    AuthModule
  ],
  providers: [ {provide:HTTP_INTERCEPTORS, useClass:InterceptorService, multi:true} ],
  bootstrap: [AppComponent]
})
export class AppModule { }
