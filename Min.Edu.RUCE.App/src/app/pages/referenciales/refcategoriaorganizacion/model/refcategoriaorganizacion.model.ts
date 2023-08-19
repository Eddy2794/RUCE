import { BaseModel } from "@app/_models/base.model";

export class RefCategoriaOrganizacionModel extends BaseModel {
    static className: string = 'RefCategoriaOrganizacion';
    constructor(
        public categoriaOrganizacionDesc?: string,

        ) {
        super();
    }
}