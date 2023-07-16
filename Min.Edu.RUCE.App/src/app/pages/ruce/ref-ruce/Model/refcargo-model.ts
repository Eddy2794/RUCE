import { BaseModel } from "@app/_models/base.model";

export class RefCargoModel extends BaseModel {
    static className: string = 'refcargo';
    constructor(
        public id?: number,
        public cargoDesc?: string,
    ){
        super();
    }
}
