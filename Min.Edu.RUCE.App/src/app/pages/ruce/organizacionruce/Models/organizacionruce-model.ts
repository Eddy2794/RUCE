import { BaseModel } from "@app/_models/base.model";

export class OrganizacionRUCEModel extends BaseModel {
    static className: string = 'organizacion';
    constructor(
        public id?: number,
        public cueAnexo?: string,
        public organizacionDesc?: string,
        public region?: string,
        public nivel?: string,
        public localidad?: string,
        public departamento?: string,
        public email?: string,
        public calle?: string,
        public numero?: string,
        public barrio?: string,
        public cp?: string,
        public telefono?: string,
    ) {
        super();
    }
}
