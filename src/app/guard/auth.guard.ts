import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UsuariosService } from '../services/usuarios.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _Us:UsuariosService,private ruta:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot){
    return this._Us.validarToken().pipe(
      tap(autenticado=>{
          if(!autenticado){
            this.ruta.navigateByUrl('/login');
          }
      })
    )
  }
  
}
