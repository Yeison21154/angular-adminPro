import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';

declare function initFunctions():any;
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  constructor(private _setting:SettingsService) {  }

  ngOnInit(): void {
    initFunctions();
  }


}
