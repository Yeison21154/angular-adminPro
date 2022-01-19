import { HospitalModels } from './hospital.model';

export interface ResMedicos {
    ok:         boolean;
    medicosall: Medicos[];
}
export interface Usuario {
    _id:    string;
    nombre: string;
}

export class Medicos{
    constructor(
        public _id:      string,
        public nombre:   string,
        public estado:   string,
        public img:      string,
        public usuario?:  Usuario,
        public hospital?: HospitalModels,
    ){}
}
