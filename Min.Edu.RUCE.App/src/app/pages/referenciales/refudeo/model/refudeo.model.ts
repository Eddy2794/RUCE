import { BaseModel } from "@app/_models/base.model";

export class RefUdeOModel extends BaseModel {
    static className: string = 'RefUdeO';
    constructor(
        public udeoDesc?: string,

    ) {
        super();
    }
}