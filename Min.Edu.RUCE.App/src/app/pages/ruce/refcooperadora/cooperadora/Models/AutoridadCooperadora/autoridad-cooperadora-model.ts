import { BaseModel } from '@app/_models/base.model';
import { CooperadoraModel } from '../Cooperadora/cooperadora-model';
import { PersonaRUCEModel } from '../../../../ref-ruce/Model/persona-ruce-model';
import { RefCargoModel } from '@app/pages/ruce/ref-ruce/Model/refcargo-model';

export class AutoridadCooperadoraModel extends BaseModel {
    static className: string = 'autoridad_cooperadora';
    constructor(
        public id?: number,
        public fkPersonaRUCE?: PersonaRUCEModel,
        public fkCooperadora?: CooperadoraModel,
        public fkRefCargo?: RefCargoModel,
        public inicioCargo?: Date,
        public finCargo?: Date,

    ) {
        super();
    }
}