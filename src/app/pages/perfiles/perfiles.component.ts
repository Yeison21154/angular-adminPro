import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.models';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';
import { FileUploadsService } from '../../services/file-uploads.service';

@Component({
  selector: 'app-perfiles',
  templateUrl: './perfiles.component.html',
  styles: [
  ]
})
export class PerfilesComponent implements OnInit {
  constructor(private _Us:UsuariosService, private fb:FormBuilder,private file:FileUploadsService) { 
    this.usuario = _Us.usuario;
  }
  public imagenSubir!:File;
  public usuario:Usuario;
  public imgTemp:any = '';
  public actForm = this.fb.group({
    nombre:[this._Us.usuario.nombre,[Validators.required]],
    email:[this._Us.usuario.email,[Validators.required,Validators.email]]
  });
  
  ngOnInit(): void {
  }
ActualizarUsuario(){
  this._Us.actualizar(this.actForm.value).subscribe(resp=>{
    const {nombre,email} = this.actForm.value;
    this._Us.usuario.nombre =nombre;
    this._Us.usuario.email = email;
    Swal.fire('guardado','Usuario Actualizado','success');
  },(error)=>{
    Swal.fire('Error',error.error.msg,'warning');
  });
}
cambiarImagen(file:any):any{

  if(file?.target?.files[0]){
    this.imagenSubir = file?.target?.files[0];
  
    if(!file){
      return this.imagenSubir = null as any;
    }
    const reader = new FileReader();
    const url64 =   reader.readAsDataURL(file?.target?.files[0]);
  
      reader.onloadend = () => {
        this.imgTemp = reader.result;
      }
}
}
subirImagen(){
  this.file.actualizarFoto(this.imagenSubir,'usuarios',this.usuario.uid!).then(
    img=>{
      this.usuario.img = img
      Swal.fire("Guardada","Imagen Actualizada",'success');
    }).catch(err=>{
      Swal.fire("Error","La imagen no se Pudo Actualizar",'error');
    })
}
}
