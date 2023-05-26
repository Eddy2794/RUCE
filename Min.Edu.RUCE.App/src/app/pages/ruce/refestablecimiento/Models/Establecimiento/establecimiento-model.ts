import { BaseModel } from "@app/_models/base.model";

export class EstablecimientoModel extends BaseModel {
    static className: string = 'organizacion';
    constructor(
        public id?: number,
        public cue?: string,
        public organizacionDesc?: string,
        public region?: string,
        public nivel?: string,
        public localidad?: string,
        public departamento?: string,
        public email?: string,
        public domicilio?: string,
        public telefono?: string,
        public anexo?: string,
    ) {
        super();
    }
}
