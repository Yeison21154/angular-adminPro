import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';


const myModules =[BreadcrumbsComponent,SidebarComponent,HeaderComponent,]
@NgModule({
  declarations: [myModules],
  exports:[myModules],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
