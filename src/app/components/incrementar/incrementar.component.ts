import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-incrementar',
  templateUrl: './incrementar.component.html',
  styles: [
  ]
})
export class IncrementarComponent{

  @Input('incre1') progreso:number = 30;
  @Input() btnClass:string = "btn btn-primary";
  @Output() valorSalida:EventEmitter<number> = new EventEmitter();
  cambiarValor(valor:number){

    if(this.progreso >=100 && valor >=0){
      this.valorSalida.emit(100);
      return this.progreso = 100;
    }
    if(this.progreso <=0 && valor <0){
      this.valorSalida.emit(0);
      return this.progreso = 0;
    }
    this.valorSalida.emit(this.progreso);
    return this.progreso = this.progreso + valor;
  }

}
