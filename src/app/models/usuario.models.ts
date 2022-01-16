import { environment } from '../../environments/environment.prod';
const urlAPI= environment.urlAPI;
let imgUrl = "";
export class Usuario {

    constructor(
        public nombre:string,
        public email:string,
        public password?:string,
        public img?:string,
        public google?:boolean,
        public rol?:string,
        public Estado?:string,
        public uid?:string,
    ){}

    get imagenUrl(){
        if(this.img?.includes('https:')){
            return this.img;
        }
        if(this.img){
            return imgUrl= `${urlAPI}/upload/usuarios/${this.img}`
        } else{
            return imgUrl= `${urlAPI}/upload/usuarios/no-img`;
        }
}
}