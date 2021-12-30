import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  public linkTheme = document.querySelector('#theme');
  constructor() { 
    
    const url = localStorage.getItem('theme') || "./assets/css/colors/default-dark.css";
    this.linkTheme?.setAttribute('href',url);
  }
  
  changeTheme(tema:string){
    const  url = `./assets/css/colors/${tema}.css`;
    this.linkTheme?.setAttribute('href',url);
    localStorage.setItem('theme',url);
    this.checkTheme();
  }
  checkTheme(){
      const links = document.querySelectorAll('.selector');
      links.forEach(element =>{
      element.classList.remove('working');
      const btnTheme = element.getAttribute('data-theme');
      const btnUrl = `./assets/css/colors/${btnTheme}.css`;
      const btnCurrent = this.linkTheme?.getAttribute('href');
      
      if(btnUrl === btnCurrent){
        element.classList.add('working')
      }

    })
}
}
