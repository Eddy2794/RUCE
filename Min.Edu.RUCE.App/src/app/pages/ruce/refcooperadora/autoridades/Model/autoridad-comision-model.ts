import { BaseModel } from '@app/_models/base.model';
import { PersonaRUCEModel } from '../../../ref-ruce/Model/persona-ruce-model';
import { RefCargoModel } from '@app/pages/ruce/ref-ruce/Model/refcargo-model';
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