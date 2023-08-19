import { BaseModel } from "@app/_models/base.model";

export class RefTipoEducacionModel extends BaseModel {
    static className: string = 'RefTipoEducacion';
    constructor(
        public tipoEducacionDesc?: string,

        ) {
        super();
    }
}