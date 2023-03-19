import { BaseModel } from '@app/_models/base.model';
import { ExpedienteModel } from './../Expediente/expediente-model';

export class PersoneriaModel extends BaseModel {
    static className: string = 'personerias';
    constructor(
        public estado_comision_directiva?: boolean,
        public estado_resolucion?: boolean,
        public estado_balance?: boolean,
        public fecha?: Date,
        public fk_expediente?: ExpedienteModel,

    ) {
        super();
    }
}
