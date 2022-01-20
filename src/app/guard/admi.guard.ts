import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class AdmiGuard implements CanActivate {
  constructor(private usuaServ:UsuariosService,private ruta:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):boolean {
      if(this.usuaServ.rol === 'ADMIN_ROLE'){
        return true;
      }else{
        this.ruta.navigateByUrl('/dashboard');
        return false;
      }
  }
  
}
