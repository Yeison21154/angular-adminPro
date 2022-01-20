import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Medicos } from 'src/app/models/medicos.model';
import { Usuario } from 'src/app/models/usuario.models';
import { BusquedasService } from '../../services/busquedas.service';
import { HospitalModels } from '../../models/hospital.model';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [
  ]
})
export class BuscarComponent implements OnInit {
  public usuarios:Usuario[]=[];
  public medicos:Medicos[]=[];
  public hospital:HospitalModels[]=[];

  constructor(private param:ActivatedRoute, private _busqServ:BusquedasService) {
    this.param.params.subscribe(({argumento})=>{
      this.busquedaGlobal(argumento);
    })
   }

  ngOnInit(): void {
  }
  busquedaGlobal(argumento:string){
    this._busqServ.busquedaGlobal(argumento).subscribe(
      (res:any)=>{
        this.usuarios = res.usuarios;
        this.medicos = res.medicos;
        this.hospital = res.hospitales;
      }
    )
  }
}
