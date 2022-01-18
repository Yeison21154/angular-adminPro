import { Injectable, EventEmitter } from '@angular/core';
import { environment } from '../../environments/environment.prod';
const urlAPI = environment.urlAPI;
@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {
  public tipo!:'usuarios'|'medicos'|'hospitales';
  public id!:string;
  public img!: string;
  private _oModal:boolean=true;
  public nuevaImg:EventEmitter<string> = new EventEmitter<string>()   
  constructor() { }

  get ocultarModal(){
    return this._oModal
  }
  abrirModal(tipo:'usuarios'|'medicos'|'hospitales',uid:string,img:string="no-img"){
    this._oModal = false;
    this.tipo = tipo,
    this.id = uid;
    this.img = img;
    if(img.includes('https')){
      this.img = img
    }else{
      this.img= `${urlAPI}/upload/${tipo}/${img}`;
    }
  }
  cerrarModal(){
    this._oModal = true;
  }
}


