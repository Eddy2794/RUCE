import { BaseModel } from '@app/_models/base.model';
import { ExpedienteModel } from '../../expediente/Models/expediente-model';
import { CooperadoraModel } from '../../cooperadora/Models/cooperadora-model';

export class PersoneriaModel extends BaseModel {
    static className: string = 'personeria';
    constructor(
        public fkExpediente?: ExpedienteModel,
        public fkCooperadora?: CooperadoraModel,
        public decreto?: string,
        public nroResolucion?: string,
        public fecha?: Date,
        public estaActivo?: boolean,
        public idUsuarioAlta?: number,
        public idUsuarioModificacion?: number,

    ) {
        super();
    }
}
