import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DasboardComponent } from './dasboard/dasboard.component';
import { ProgressComponent } from './progress/progress.component';
import { PagesComponent } from './pages.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';

const MyModules =[DasboardComponent,ProgressComponent,Grafica1Component,PagesComponent]

@NgModule({
  declarations: [MyModules],
  exports:[MyModules],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule
  ]
})
export class PagesModule { }
