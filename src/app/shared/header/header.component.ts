import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.models';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {
  public usuario:Usuario ;
  constructor(private _us:UsuariosService,private _ruta:Router) { 
    this.usuario = _us.usuario!;
  }

  logoOuth(){
    this._us.logoOut();
  }
  ngOnInit(): void {
  }
  buscar(argumento:string){
    this._ruta.navigateByUrl(`/dashboard/buscar/${argumento}`);
  }
}
