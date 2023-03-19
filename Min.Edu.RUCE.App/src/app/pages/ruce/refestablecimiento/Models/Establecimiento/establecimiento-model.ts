import { BaseModel } from "@app/_models/base.model";

export class EstablecimientoModel extends BaseModel {
    static className: string = 'establecimientos_educativos';
    constructor(
        public cue?: BigInt,
        public region?: string,
        public nivel?: string,
        public localidad?: string,
        public departamento?: string,
        public email?: string,
        public domicilio?: string,
        public telefono?: BigInt,
        public matricula?: number,
    ) {
        super();
    }
}
