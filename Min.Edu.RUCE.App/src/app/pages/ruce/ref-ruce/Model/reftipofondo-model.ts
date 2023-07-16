import { BaseModel } from "@app/_models/base.model";

export class RefTipoFondoModel extends BaseModel {
    static className: string = 'tipo_fondo';
    constructor(
        public id?: number,
        public tipoFondoDesc?: string,
    ){
        super();
    }
}
