import { Component, OnDestroy, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';
import { Usuario } from 'src/app/models/usuario.models';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit, OnDestroy {
  total:number=0;
  usuarios:Usuario[]=[];
  imgSubs!:Subscription;
  desde:number=0;
  cargando:boolean=true;
  constructor(private _Us:UsuariosService,private _Ub:BusquedasService,private _mS:ModalImagenService) { }
  ngOnDestroy(): void {
   this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.CargarUsuarios();
    this.imgSubs = this._mS.nuevaImg
    .pipe(
      delay(100)
    )
    .subscribe(resp=>{
      this.CargarUsuarios()
    })
  }
  CargarUsuarios(){
    this.cargando=true
    this._Us.GetUsuarios(this.desde).subscribe(({total,usuarios})=>{
      this.total=total;
      this.usuarios = usuarios;
      this.cargando=false;
    });
  }
  next(valor:number){
    this.desde += valor;
    if(this.desde < 0){
      this.desde = 0
    }else if(this.desde >= this.total){
      this.desde =this.total ;
    }
    this.CargarUsuarios();
  }
  buscar(argumento:string){
    if(argumento === ''){
      this.CargarUsuarios();
    }else if(argumento != ''){
    this._Ub.buscar('usuarios',argumento).subscribe(
      (resp:any)=>{
        this.usuarios = resp
      }
    )
    }
  }
  borrarUsuario(usuario:Usuario){
    if(usuario.uid === this._Us.uid){
      Swal.fire('Error al Eliminar',"El Usuario se Encuentra Activo",'question');
    }else{
      Swal.fire({
        title: 'Eliminar Usuario',
        text: `Seguro de Eliminar a ${usuario.nombre}!`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this._Us.BoorarUsuario(usuario).subscribe(res=>{
            this.CargarUsuarios();
            Swal.fire('Eliminado',"Usuario Eliminado Exitosamente",'success');
          })
        }
      })
    }
  }
  cambiarRol(usuario:Usuario){
    this._Us.actualizarRol(usuario).subscribe(
      resp=>{
        console.log(resp)
      }
    )
  }
abrirModal(usuario:Usuario){
  this._mS.abrirModal('usuarios',usuario.uid!,usuario.img);
}
}
