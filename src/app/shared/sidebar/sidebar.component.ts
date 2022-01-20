import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { UsuariosService } from '../../services/usuarios.service';
import { Usuario } from '../../models/usuario.models';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {
  public usuario: Usuario;
  menuItems:any[];

  constructor(public _sidebarS:SidebarService, private _Us:UsuariosService) {
    this.menuItems = _sidebarS.cargarMenu();
    this.usuario  =_Us.usuario!;
   }

  ngOnInit(): void {
  }

}
