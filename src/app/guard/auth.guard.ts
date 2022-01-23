import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { UsuariosService } from '../services/usuarios.service';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private _Us:UsuariosService,private ruta:Router){}

  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this._Us.validarToken().pipe(
      tap(autenticado=>{
          if(!autenticado){
            this.ruta.navigateByUrl('/login');
          }
      })
    )
  }
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
