import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


const loginModules = [LoginComponent,RegisterComponent,];
@NgModule({
  declarations: [loginModules],
  exports:[loginModules],
  imports: [
    CommonModule
  ]
})
export class AuthModule { }
