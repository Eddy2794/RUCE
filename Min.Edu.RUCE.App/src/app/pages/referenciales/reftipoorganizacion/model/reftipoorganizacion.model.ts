import { BaseModel } from "@app/_models/base.model";

export class RefTipoOrganizacionModel extends BaseModel {
    static className: string = 'RefTipoOrganizacion';
    constructor(
        public tipoOrganizacionDesc?: string,
        public esEducativa?: boolean

    ) {
        super();
    }
}