import { BaseModel } from "./base.model";

export class  Role extends BaseModel {
    static className: string =  'Role';

    constructor(
        public id?: number,
        public  name?: string,
    ) {
        super();
    }
}