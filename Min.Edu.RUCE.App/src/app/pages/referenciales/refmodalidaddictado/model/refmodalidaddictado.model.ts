import { BaseModel } from "@app/_models/base.model";

export class RefModalidadDictadoModel extends BaseModel {
    static className: string = 'RefModalidadDictado';
    constructor(
        public id?: number,
        public modalidadDictadoDesc?: string,
    ) {
        super();
    }
}