import { BaseModel } from "@app/_models/base.model";

export class RefFinalidadModel extends BaseModel {
    static className: string = 'RefFinalidad';
    constructor(
        public finalidadDesc?: string,

        ) {
        super();
    }
}