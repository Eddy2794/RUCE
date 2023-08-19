import { BaseModel } from "@app/_models/base.model";

export class RefFuncionModel extends BaseModel {
    static className: string = 'RefFuncion';
    constructor(
        public funcionDesc?: string,

        ) {
        super();
    }
}