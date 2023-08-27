import { BaseModel } from '@app/_models/base.model';
import { RefCargoModel } from '@app/pages/ruce/refruce/Model/refcargo-model';
import { PersonaRUCEModel } from '../../refruce/Model/persona-ruce-model';
import { ComisionModel } from '../../comision/Models/comision-model';

export class AutoridadComisionModel extends BaseModel {
    static className: string = 'autoridad_comision';
    constructor(
        public id?: number,
        public fkPersonaRUCE?: PersonaRUCEModel,
        public fkRefCargo?: RefCargoModel,
        public fkComision?: ComisionModel,
        public inicioCargo?: Date,
        public finCargo?: Date,
        public estaActivo?: boolean,
        public idUsuarioAlta?: number,
        public idUsuarioModificacion?: number,

    ) {
        super();
    }
}