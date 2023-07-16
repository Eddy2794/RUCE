import { BaseModel } from "@app/_models/base.model";

export class RefInstanciaInstrumentoModel extends BaseModel {
    static className: string = 'instancia_instrumento';
    constructor(
        public id?: number,
        public instrumentoDesc?: string,
    ){
        super();
    }
}
