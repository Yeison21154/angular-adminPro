import { Component, OnDestroy, OnInit } from '@angular/core';
import { HospitalesService } from 'src/app/services/hospitales.service';
import Swal from 'sweetalert2';
import { HospitalModels } from '../../../models/hospital.model';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { BusquedasService } from '../../../services/busquedas.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit, OnDestroy {
  public hospitales:HospitalModels[]=[];
  public cargando:boolean=true;
  private imgSubs!:Subscription;
  constructor(private HospS:HospitalesService,private _mS:ModalImagenService,private busS:BusquedasService) { }
  
  ngOnInit(): void {
    this.cargarHospitales();
    this.imgSubs = this._mS.nuevaImg
    .pipe(
      delay(100)
      )
      .subscribe(resp=>{
        this.cargarHospitales()
      })
    }
    ngOnDestroy(): void {
      this.imgSubs.unsubscribe();
    }
  
cargarHospitales(){
  this.cargando=true;
  this.HospS.getHospital().subscribe(hospitales=>{
    this.hospitales = hospitales
    this.cargando=false;
  })
}
actualizarHosp(hospital:HospitalModels){
  this.HospS.putHospital(hospital._id,hospital.nombre).subscribe(
    resp=>{
      this.cargarHospitales();
      Swal.fire("Actualizado","Hospital Actualizado",'success');
    }
  )
}
eliminarHosp(hospital:HospitalModels){
       Swal.fire({
        title: 'Eliminar?',
        text: `Seguro de Eliminar a ${hospital.nombre}!`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, Eliminar!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.HospS.deleteHospital(hospital._id).subscribe(
            res=>{
          this.cargarHospitales();
          Swal.fire('Eliminado',`${hospital.nombre} Eliminado`,'success')
            });
        }
      }) 
}
async crearHosp(){
  const { value = ""} = await Swal.fire<string>({
    title:"Crear Hospital",
    text:"Ingrese el Nombre del nuevo Hospital",
    input: 'text',
    inputPlaceholder: 'Nombre del Hospital',
    showCancelButton: true,
  })
  
  if (value.trim().length > 0) {
    this.HospS.postHospital(value).subscribe(
      (res:any)=>{
        this.hospitales.push(res.hospital)
      }
    )
  }
}
abrirModal(hospital:HospitalModels){
  this._mS.abrirModal('hospitales',hospital._id,hospital.img);
}
BuscarHosp(argumento:string)
{
  if(argumento === ''){
    this.cargarHospitales();
  }else if(argumento != ''){
  this.busS.buscar('hospitales',argumento).subscribe(
    (resp:any)=>{
      this.hospitales = resp
      console.log(resp);
    }
  )
  }
}
}

