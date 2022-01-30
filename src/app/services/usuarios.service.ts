import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { ActUserInt, LoginInt, RegistroInt } from '../interfaces/registro.interface';
import { environment } from '../../environments/environment.prod';
import { tap, map, catchError, delay } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.models';
import { GetUsuarios } from '../interfaces/Usuarios.interface';
declare const gapi:any;
const urlAPI = environment.urlAPI;
@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http:HttpClient, private _ruta:Router, private ngZone:NgZone) { this.initGoogle(); }
  public auth2:any;
  public usuario! : Usuario;
  get uid():string{
    return this.usuario.uid || '';
  }
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
  get rol():'USER_ROLE'|'ADMIN_ROLE'{
    return this.usuario.rol!;
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
                                        localStorage.setItem('token',res.token);
                                        localStorage.setItem('menu',JSON.stringify(res.menu));
                                    })
                              );
  }
  Login(formData:LoginInt){
    return this.http.post(`${urlAPI}/login`,formData).pipe(
                              tap((res:any)=>{
                                  localStorage.setItem('token',res.token);
                                  localStorage.setItem('menu',JSON.stringify(res.menu));
                              })
    );
  }
  LoginGoogle(token:any){
    return this.http.post(`${urlAPI}/login/google`,{token}).pipe(
                              tap((res:any)=>{
                                  localStorage.setItem('token',res.token);
                                  localStorage.setItem('menu',JSON.stringify(res.menu));
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
        //console.log(resp);
        const {nombre,email,img,google,rol,Estado,uid} = resp.usuarioDB;
        this.usuario = new Usuario(nombre,email,'',img,google,rol,Estado,uid)
        localStorage.setItem('token',resp.token);
        localStorage.setItem('menu',JSON.stringify(resp.menu));
        localStorage.setItem('usuarioT',JSON.stringify(resp.uid))
        return true;
      }),
      catchError(error=> of(false))
    )
  }
  logoOut(){
    localStorage.removeItem('token');
    localStorage.removeItem('menu');
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
  GetUsuarios(valor:number=0){
    return this.http.get<GetUsuarios>(`${urlAPI}/usuarios?desde=${valor}`,this.header).pipe(
      //delay(3000),
      map(res=>{
        const usuarios = res.usuarios.map(user=> new Usuario(user.nombre,user.email,'',user.img,user.google,user.rol,user.Estado,user.uid))
        return {
          total:res.total,
          usuarios
        };
      })
    );
  }
  BoorarUsuario(usuario:Usuario){
    return this.http.patch(`${urlAPI}/usuarios/${usuario.uid}`,{Estado:'inactivo'},this.header);
  }
  actualizarRol(user:Usuario){ 
    return this.http.put(`${urlAPI}/usuarios/${user.uid}`,user,this.header)
   }
}
