import { BaseModel } from '@app/_models/base.model';

export class PersonaRUCEModel extends BaseModel {
    static className: string = 'PersonaRUCE';
    constructor(
        public id?: number,
        public fkRefTipoDocumentoRUCE?: number,
        public documento?: string,
        public cuil?: string,
        public nombre?: string,
        public apellido?: string,
        public telefono?: string,
        public email?: string,
    ) {
        super();
    }
}