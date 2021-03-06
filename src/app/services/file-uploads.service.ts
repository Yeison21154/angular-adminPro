import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';

const urlAPI =environment.urlAPI;
@Injectable({
  providedIn: 'root'
})
export class FileUploadsService {

  constructor() { }
  async actualizarFoto(archivo:File,tipo:"usuarios"|"medicos"|"hospitales",id:string){

    try {
      const url = `${urlAPI}/upload/${tipo}/${id}`;
      const formData = new FormData();
      formData.append('imagen',archivo);

      const resp = await fetch(url,{
        method:'PUT',
        headers:{
          "x-token":localStorage.getItem('token') || ''
        },
        body:formData
      })
      const data = await resp.json();
      if(data.ok){
        return data.nombreArchivo
      }else{
        return false;
      }
    } catch (error) {
      console.log(error);

    }

  }
}
