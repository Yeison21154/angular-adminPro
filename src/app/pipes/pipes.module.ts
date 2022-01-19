import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagenPipe } from './imagen.pipe';



const myPipes =[ImagenPipe]

@NgModule({
  declarations: [myPipes],
  exports:[myPipes],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
