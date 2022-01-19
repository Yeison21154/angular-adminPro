import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { map } from 'rxjs/operators';
import { Hospital } from '../models/hospital.model';

const urlAPI = environment.urlAPI;
@Injectable({
  providedIn: 'root'
})
export class HospitalesService {

  get token(){
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

  getHospital(){
    return this._http.get<Hospital>(`${urlAPI}/hospitales`,this.header).pipe(
      map((rep:Hospital)=>rep.hospital)
    )
  }
  postHospital(nombre:string){
    return this._http.post(`${urlAPI}/hospitales`,{nombre},this.header);
  }
  putHospital(_id:string,nombre:string){
    return this._http.put(`${urlAPI}/hospitales/${_id}`,{nombre},this.header);
  }
  deleteHospital(_id:string){
    return this._http.delete(`${urlAPI}/hospitales/${_id}`,this.header)
  }
}
