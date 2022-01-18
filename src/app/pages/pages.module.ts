import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DasboardComponent } from './dasboard/dasboard.component';
import { ProgressComponent } from './progress/progress.component';
import { PagesComponent } from './pages.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../components/components.module';
import { SettingsComponent } from './settings/settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RXJSComponent } from './rxjs/rxjs.component';
import { PerfilesComponent } from './perfiles/perfiles.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';

const myComponents =[DasboardComponent,ProgressComponent,Grafica1Component,PagesComponent,SettingsComponent,
                     PromesasComponent,RXJSComponent]

@NgModule({
  declarations: [myComponents, PerfilesComponent, UsuariosComponent],
  exports:[myComponents],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule,
    FormsModule,
    ComponentsModule,
    ReactiveFormsModule
  ]
})
export class PagesModule { }
