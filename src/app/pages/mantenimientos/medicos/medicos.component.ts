import { Component, OnInit, OnDestroy } from '@angular/core';
import { Medicos } from 'src/app/models/medicos.model';
import { MedicosService } from 'src/app/services/medicos.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { BusquedasService } from '../../../services/busquedas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit, OnDestroy {
  public medicos:Medicos[]=[];
  public cargando :boolean =true;
  private imgSus!:Subscription;
  constructor(private medicoS:MedicosService,private _mS:ModalImagenService, private BusqS:BusquedasService) { }
  
  ngOnInit(): void {
    this.cargarMedicos();
    this.imgSus = this._mS.nuevaImg.pipe(
      delay(100)      
      ).subscribe(res=>{
        this.cargarMedicos();
      })
    }
    ngOnDestroy(): void {
      this.imgSus.unsubscribe();
    }
  cargarMedicos(){
    this.cargando =true
    this.medicoS.getMedicos().subscribe(res=>{
      this.medicos = res;
      this.cargando =false;
    })
  }
  abrirModal(medicos:Medicos){
    this._mS.abrirModal('medicos',medicos._id,medicos.img);
  }
  buscar(valor:string){
    if(valor == ""){
      this.cargarMedicos();
    }else{
      this.BusqS.buscar('medicos',valor).subscribe((res:any)=>{
        this.medicos = res; 
      })
    }
  }
  borrarMed(medico:Medicos){
    Swal.fire({
      title: 'Eliminar?',
      text: `Deseas Eliminar a ${medico.nombre}!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.medicoS.deleteMedicos(medico).subscribe(res=>{
          this.cargarMedicos();
          Swal.fire("Eliminado","Medico Eliminado",'success');
        })
      }
    })
  }
}
