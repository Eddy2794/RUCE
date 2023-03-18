import { BaseModel } from "./base.model";

export class  Role extends BaseModel {
    static className: string =  'Role';

    constructor(
        public  name?: string,
        public  description?: string,
    ) {
        super();
    }
}