import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.models';
import { FileUploadsService } from 'src/app/services/file-uploads.service';
import Swal from 'sweetalert2';
import { ModalImagenService } from '../../services/modal-imagen.service';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent implements OnInit {
  public imagenSubir!:File;
  public imgTemp:any = '';
  
  constructor(public mS:ModalImagenService,private file:FileUploadsService) { }

  ngOnInit(): void {
  }
  ocultarModal(){
    this.imgTemp = null;
    this.mS.cerrarModal();
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
    const id= this.mS.id;
    const tipo = this.mS.tipo;
    this.file.actualizarFoto(this.imagenSubir,tipo,id).then(
      img=>{
        Swal.fire("Guardada","Imagen Actualizada",'success');
        this.mS.nuevaImg.emit(img);
        this.ocultarModal();
      }).catch(err=>{
        Swal.fire("Error","La imagen no se Pudo Actualizar",'error');
      })
  }

}
