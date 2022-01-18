import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncrementarComponent } from './incrementar/incrementar.component';
import { FormsModule } from '@angular/forms';
import { GdonasComponent } from './gdonas/gdonas.component';

import { NgChartsModule } from 'ng2-charts';
import { ModalImagenComponent } from './modal-imagen/modal-imagen.component';


@NgModule({
  declarations: [
    IncrementarComponent,
    GdonasComponent,
    ModalImagenComponent
  ],
  exports:[
    IncrementarComponent,
    GdonasComponent,
    ModalImagenComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgChartsModule
  ]
})
export class ComponentsModule { }
