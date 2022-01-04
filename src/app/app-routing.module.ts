import { NgModule } from '@angular/core';
import {RouterModule, Routes } from '@angular/router';
import { NotpagesfoundComponent } from './pages/notpagesfound/notpagesfound.component';
import { PagesRoutingModule } from './pages/pages.routing';
import { AuthRoutingModule } from './auth/auth.routing';


const routes:Routes = [
  { path:'',redirectTo:'/dashboard', pathMatch:'full'},
  { path:'**', component:NotpagesfoundComponent }
]
@NgModule({
  imports: [RouterModule.forRoot(routes),PagesRoutingModule,AuthRoutingModule],
  exports:[RouterModule]
})
export class AppRoutingModule { }
