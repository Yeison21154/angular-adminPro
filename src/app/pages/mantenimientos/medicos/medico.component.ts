import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HospitalModels } from 'src/app/models/hospital.model';
import { MedicosService } from 'src/app/services/medicos.service';
import Swal from 'sweetalert2';
import { HospitalesService } from '../../../services/hospitales.service';
import { Medicos } from '../../../models/medicos.model';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {

  constructor(private fb:FormBuilder,private hospSer:HospitalesService,
              private medicoServ:MedicosService,
              private ruta:Router,
              private actRoute:ActivatedRoute) { }
  public hospital:HospitalModels[]=[];
  public HospSeleccionado:HospitalModels | undefined;
  public MedicoSeleccionado!:Medicos;
  public medicoForm = this.fb.group({
    nombre:['',Validators.required],
    hospital:['',Validators.required]
  })
  ngOnInit(): void {
    this.actRoute.params.subscribe(({id})=>{
      this.cargarMedico(id);
    })
    this.cargarHospital();
    this.medicoForm.get('hospital')?.valueChanges.subscribe(id=>{
      this.HospSeleccionado = this.hospital.find(h=> h._id === id);
    });
  }
  cargarMedico(id:string){
    if(id !== 'nuevo'){
      this.medicoServ.getMedicosID(id)
      .pipe(delay(100))
      .subscribe(medico=>{
        if(!medico){
          return this.ruta.navigateByUrl(`/dashboard/medicos`);
        }
        this.MedicoSeleccionado = medico;
        const {nombre,hospital:{_id}} = medico;
        this.medicoForm.setValue({nombre,hospital:_id})
      }
      )
    }
  }
  CrearMedico(){
    const {nombre}= this.medicoForm.value;
    if(this.MedicoSeleccionado){
      const data={
        ...this.medicoForm.value,
        _id:this.MedicoSeleccionado._id
      }
      this.medicoServ.putMedico(data).subscribe(res=>{
        Swal.fire("Actualizado",`El Medico ${nombre} fue Actualizado Exitoxamente`,'success');
      })
    }else{
      const {nombre, hospital}= this.medicoForm.value;
      this.medicoServ.postMedicos(nombre,hospital).subscribe((res)=>{
      Swal.fire("Creado",`El Medico ${nombre} fue creado Exitoxamente`,'success');
      this.ruta.navigateByUrl(`/dashboard/medico/${res._id}`);
    })
    }
  }
  cargarHospital(){
    this.hospSer.getHospital().subscribe(
      resp=>{
        this.hospital = resp;
      }
    )
  }
}
