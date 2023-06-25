import { BaseModel } from "@app/_models/base.model";

export class RefTipoDocumentoModel extends BaseModel {
    static className: string = 'tipo_documento';
    constructor(
        public id?: number,
        public tipoDocumentoDesc?: string,
    ){
        super();
    }
}