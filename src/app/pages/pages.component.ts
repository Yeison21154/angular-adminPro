import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import { SidebarService } from '../services/sidebar.service';

declare function initFunctions():any;
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  constructor(private _setting:SettingsService, private sidebarSer:SidebarService) {  }

  ngOnInit(): void {
    initFunctions();
    this.sidebarSer.cargarMenu();
  }


}
