
import { BaseModel } from "@app/_models/base.model";

export class RefAdicionalModel extends BaseModel {
    static className: string = 'RefAdicional';
    constructor(
        public adicionalDesc?: string,
        public porcentaje?: number,



    ) {
        super();
    }

}