import { BaseModel } from "@app/_models/base.model";

export class RefTitulacionModel extends BaseModel {
    static className: string = 'RefTitulacion';
    constructor(
        public titulacionDesc?: string,

        ) {
        super();
    }
}