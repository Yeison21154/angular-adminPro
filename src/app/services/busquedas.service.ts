import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Usuario } from 'src/app/models/usuario.models';
import { HospitalModels } from '../models/hospital.model';
import { Medicos } from '../models/medicos.model';

const urlAPI = environment.urlAPI;
@Injectable({
  providedIn: 'root'
})
export class BusquedasService {
  get token (){
    return localStorage.getItem('token') || '';
  }
  get header(){
    return {
      headers:{
        'x-token':this.token
      }
    }
  }
  constructor(private _http:HttpClient) { }

  private TransUsuarios(resul:any[]):Usuario[]{
    return resul.map(
     user=> new Usuario(user.nombre,user.email,'',user.img,user.google,user.rol,user.Estado,user.uid));
  }
  private TransHospitales(resultado:any[]):HospitalModels[]{
    return resultado;
  }
  private TransMedicos(resultado:any[]):Medicos[]{
    return resultado;
  }
  
  buscar(tipo:'usuarios'|'medicos'|'hospitales',argumento:string){
    return this._http.get<any[]>(`${urlAPI}/todo/coleccion/${tipo}/${argumento}`,this.header).pipe(
      map((res:any)=>{
        switch (tipo) {
          case 'usuarios':
            return this.TransUsuarios(res.Resultados);
          case 'hospitales':
            return this.TransHospitales(res.Resultados);
          case 'medicos':
            return this.TransMedicos(res.Resultados)
          default:
            return [];
        }
      })
    )
   }
}
