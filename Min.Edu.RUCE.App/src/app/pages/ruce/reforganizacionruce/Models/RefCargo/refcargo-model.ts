import { BaseModel } from "@app/_models/base.model";

export class RefCargoModel extends BaseModel {
    static className: string = 'RefCargo';
    constructor(
        public id?: number,
        public cargoDesc?: string,
    ){
        super();
    }
}
