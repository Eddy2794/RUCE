import { BaseModel } from "@app/_models/base.model";

export class RefTipoAsociacionModel extends BaseModel {
    static className: string = 'tipo_asociacion';

    constructor(
        public id?: number,
        public tipoAsociacionDesc?: string,
    ){
        super();
    }
}
