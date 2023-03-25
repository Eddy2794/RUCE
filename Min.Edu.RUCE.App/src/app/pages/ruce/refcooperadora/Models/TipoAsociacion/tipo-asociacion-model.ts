import { BaseModel } from "@app/_models/base.model";

export class TipoAsociacionModel extends BaseModel {
    static className: string = 'tipo_asociacion';
    constructor(
        public descripcion?: string,

    ) {
        super();
    }
}