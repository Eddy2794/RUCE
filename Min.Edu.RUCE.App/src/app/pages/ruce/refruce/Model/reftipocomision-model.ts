import { BaseModel } from "@app/_models/base.model";

export class ReftipocomisionModel extends BaseModel {
    static className: string = 'tipo_comision';
    constructor(
        public id?: number,
        public tipoComisionDesc?: string,
        public estaActivo?: boolean,
        public idUsuarioAlta?: number,
        public idUsuarioModificacion?: number,
    ){
        super();
    }
}
