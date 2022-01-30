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
import { PerfilesComponent } from './perfiles/perfiles.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { PipesModule } from '../pipes/pipes.module';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { BuscarComponent } from './buscar/buscar.component';

const myComponents =[DasboardComponent,ProgressComponent,Grafica1Component,PagesComponent,SettingsComponent,PerfilesComponent, UsuariosComponent, HospitalesComponent, MedicosComponent]

@NgModule({
  declarations: [myComponents, MedicoComponent, BuscarComponent],
  exports:[myComponents],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule,
    FormsModule,
    ComponentsModule,
    ReactiveFormsModule,
    PipesModule
  ]
})
export class PagesModule { }
