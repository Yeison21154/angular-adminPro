import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styles: [
  ]
})
export class SettingsComponent implements OnInit {

  public linkTheme = document.querySelector('#theme');
  constructor(private _settings:SettingsService) { }

  ngOnInit(): void {
    this._settings.checkTheme;
  }
  changeTheme(theme:string){
    
    this._settings.changeTheme(theme);
  }

}
