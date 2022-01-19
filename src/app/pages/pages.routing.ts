import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DasboardComponent } from "./dasboard/dasboard.component";
import { Grafica1Component } from "./grafica1/grafica1.component";
import { PagesComponent } from "./pages.component";
import { ProgressComponent } from "./progress/progress.component";
import { PromesasComponent } from "./promesas/promesas.component";
import { SettingsComponent } from './settings/settings.component';
import { RXJSComponent } from './rxjs/rxjs.component';
import { AuthGuard } from "../guard/auth.guard";
import { PerfilesComponent } from "./perfiles/perfiles.component";
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { HospitalesComponent } from "./mantenimientos/hospitales/hospitales.component";
import { MedicosComponent } from "./mantenimientos/medicos/medicos.component";
import { MedicoComponent } from "./mantenimientos/medicos/medico.component";


const routes:Routes =[{
     path: 'dashboard', component:PagesComponent, canActivate:[AuthGuard] ,children:[
        { path:'', component:DasboardComponent,data:{titulo:"Dashboard"}},
        { path:'progress', component:ProgressComponent,data:{titulo:"Progress"} },
        { path:'grafica1', component:Grafica1Component,data:{titulo:"Graficas"} },
        { path:'settings', component:SettingsComponent,data:{titulo:"Settings"} },
        { path:'perfil', component:PerfilesComponent,data:{titulo:'Perfil de Usuario'}},
        { path:'promesas', component:PromesasComponent,data:{titulo:"Promesas"} },
        { path:'rxjs', component:RXJSComponent,data:{titulo:"Rxjs"}},
        //mantenimientos
        { path:'usuarios', component:UsuariosComponent,data:{titulo:"Mantenimiento Usuarios"}},
        { path:'hospitales', component:HospitalesComponent,data:{titulo:"Mantenimiento Hospitales"}},
        { path:'medicos', component:MedicosComponent,data:{titulo:"Mantenimiento Medicos"}},
        { path:'medico/:id', component:MedicoComponent,data:{titulo:"Mantenimiento Medico"}}
      ]},

      
]
@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})

export class PagesRoutingModule{}