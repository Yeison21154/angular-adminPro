import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  constructor(private _us:UsuariosService) { }

  logoOuth(){
    this._us.logoOut();
  }
  ngOnInit(): void {
  }

}
