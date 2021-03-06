import { NgModule } from '@angular/core';
import { DasboardComponent } from "./dasboard/dasboard.component";
import { Grafica1Component } from "./grafica1/grafica1.component";
import { ProgressComponent } from "./progress/progress.component";
import { SettingsComponent } from './settings/settings.component';
import { PerfilesComponent } from "./perfiles/perfiles.component";
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { HospitalesComponent } from "./mantenimientos/hospitales/hospitales.component";
import { MedicosComponent } from "./mantenimientos/medicos/medicos.component";
import { MedicoComponent } from "./mantenimientos/medicos/medico.component";
import { BuscarComponent } from "./buscar/buscar.component";
import { AdmiGuard } from '../guard/admi.guard';
import { RouterModule, Routes } from '@angular/router';

const childRoutes:Routes = [
  { path:'', component:DasboardComponent,data:{titulo:"Dashboard"}},
  { path:'buscar/:argumento', component:BuscarComponent, data:{titulo:"Busqueda"}},
  { path:'grafica1', component:Grafica1Component,data:{titulo:"Graficas"} },
  { path:'perfil', component:PerfilesComponent,data:{titulo:'Perfil de Usuario'}},
  { path:'progress', component:ProgressComponent,data:{titulo:"Progress"} },
  { path:'settings', component:SettingsComponent,data:{titulo:"Settings"} },
  //mantenimientos
  { path:'hospitales', component:HospitalesComponent,data:{titulo:"Mantenimiento Hospitales"}},
  { path:'medicos', component:MedicosComponent,data:{titulo:"Mantenimiento Medicos"}},
  { path:'medico/:id', component:MedicoComponent,data:{titulo:"Mantenimiento Medico"}},
  { path:'usuarios',canActivate:[AdmiGuard] ,component:UsuariosComponent,data:{titulo:"Mantenimiento Usuarios"}},
]

@NgModule({
  imports:[RouterModule.forChild(childRoutes)],
  exports:[RouterModule],
})
export class ChildRoutesModule { }
