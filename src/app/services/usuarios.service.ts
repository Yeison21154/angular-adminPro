import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { ActUserInt, LoginInt, RegistroInt } from '../interfaces/registro.interface';
import { environment } from '../../environments/environment.prod';
import { tap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { Usuario } from '../models/usuario.models';
declare const gapi:any;
const urlAPI = environment.urlAPI;
@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http:HttpClient, private _ruta:Router, private ngZone:NgZone) { this.initGoogle(); }
  public auth2:any;
  public usuario! : Usuario;
  get token (){
    return localStorage.getItem('token') || '';
  }
  initGoogle(){
      return new Promise<void>(resolve=>{
        gapi.load('auth2', () =>{
          this.auth2 = gapi.auth2.init({
            client_id: '1022403447549-cobpq8f3ndpnm0ce8phgbkp53bljn0cg.apps.googleusercontent.com',
            cookiepolicy: 'single_host_origin',
          });
          resolve();
        });
      })
  }
  crearUsuario(formData:RegistroInt){
    return this.http.post(`${urlAPI}/usuarios`,formData).pipe(
                                    tap((res:any)=>{
                                        localStorage.setItem('token',res.token)
                                    })
                              );
  }
  Login(formData:LoginInt){
    return this.http.post(`${urlAPI}/login`,formData).pipe(
                              tap((res:any)=>{
                                  localStorage.setItem('token',res.token)
                              })
    );
  }
  LoginGoogle(token:any){
    return this.http.post(`${urlAPI}/login/google`,{token}).pipe(
                              tap((res:any)=>{
                                  localStorage.setItem('token',res.token)
                              })
    );
  }
  validarToken():Observable<boolean>{
    return this.http.get(`${urlAPI}/login/renew`,{
      headers:{
        'x-token':this.token
      }
    }).pipe(
      map((resp:any)=>{
        console.log(resp);
        const {nombre,email,img,google,rol,Estado,uid} = resp.usuarioDB;
        this.usuario = new Usuario(nombre,email,'',img,google,rol,Estado,uid)
        localStorage.setItem('token',resp.token);
        return true;
      }),
      catchError(error=> of(false))
    )
  }
  logoOut(){
    localStorage.removeItem('token');
    this._ruta.navigateByUrl('/login');
    this.auth2.signOut().then(()=> {
      this.ngZone.run(()=>{
        this._ruta.navigateByUrl('/login')
      })
    });
  }
  actualizar(data:ActUserInt){ 
    data = {...data,rol:this.usuario.rol!}
   return this.http.put(`${urlAPI}/usuarios/${this.usuario.uid}`,data,{
      headers:{
        'x-token':this.token
      }
    })
  }
}
