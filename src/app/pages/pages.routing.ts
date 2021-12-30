import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DasboardComponent } from "./dasboard/dasboard.component";
import { Grafica1Component } from "./grafica1/grafica1.component";
import { PagesComponent } from "./pages.component";
import { ProgressComponent } from "./progress/progress.component";
import { SettingsComponent } from './settings/settings.component';


const routes:Routes =[
    { path: 'dashboard', component:PagesComponent, children:[
        { path:'', component:DasboardComponent },
        { path:'progress', component:ProgressComponent },
        { path:'grafica1', component:Grafica1Component },
        { path:'settings', component:SettingsComponent }
      ]},
      
]
@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})

export class PagesRoutingModule{}