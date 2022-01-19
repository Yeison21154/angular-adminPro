import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { ResMedicos, Medicos } from '../models/medicos.model';
import { map } from 'rxjs/operators';
const urlAPI = environment.urlAPI;
@Injectable({
  providedIn: 'root'
})
export class MedicosService {
  get token(){
    return localStorage.getItem('token') || '';
  }
  get header(){
    return {
      headers:{
        'x-token': this.token
      }
    }
  }
  constructor(private _http:HttpClient) { }
  postMedicos(nombre:string,hospital:string){
    return this._http.post<ResMedicos>(`${urlAPI}/medicos`,{nombre,hospital},this.header).pipe(
      map((res:any)=>{
        return res.insertMedico;
      })
    );
  }
  getMedicos(){
    return this._http.get<ResMedicos>(`${urlAPI}/medicos`,this.header).pipe(
      map(res=>{
        return res.medicosall;
      })
    )
  }
  getMedicosID(id:string){
    return this._http.get(`${urlAPI}/medicos/${id}`,this.header).pipe(
      map((res:any)=>{
        return res.medico;
      })
    )
  }
  putMedico(medico:Medicos){
    return this._http.put(`${urlAPI}/medicos/${medico._id}`,medico,this.header);
  }
  deleteMedicos(medicos:Medicos){
    return this._http.patch(`${urlAPI}/medicos/${medicos._id}`,{estado:'inactivo'},this.header);
  }
}
