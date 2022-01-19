export interface Hospital {
    ok:       boolean;
    hospital: HospitalModels[];
}
interface _HospitalUSer {
    _id:    string,
    nombre: string,
    img:    string
}

export class HospitalModels{
    constructor(
        public nombre:  string,
        public _id:     string,
        public usuario: _HospitalUSer,
        public img?:    string
    ){}
}
