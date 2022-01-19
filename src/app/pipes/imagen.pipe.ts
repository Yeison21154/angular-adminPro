import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment.prod';
const urlAPI = environment.urlAPI;
@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img:string | undefined, tipo:'usuarios'|'hospitales'|'medicos'):string {

      if(!img){
          return `${urlAPI}/upload/${tipo}/no-img`;
      }else if(img?.includes('https:')){
          return img;
      }else if(img){
          return `${urlAPI}/upload/${tipo}/${img}`
      } else{
          return `${urlAPI}/upload/${tipo}/no-img`;
      }
  }

}
