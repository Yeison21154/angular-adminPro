import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.models';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {
  public usuario:Usuario ;
  constructor(private _us:UsuariosService) { 
    this.usuario = _us.usuario!;
  }

  logoOuth(){
    this._us.logoOut();
  }
  ngOnInit(): void {
  }

}
