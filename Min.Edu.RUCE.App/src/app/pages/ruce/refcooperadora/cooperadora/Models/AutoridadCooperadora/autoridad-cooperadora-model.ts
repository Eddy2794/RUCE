import { BaseModel } from '@app/_models/base.model';
import { CooperadoraModel } from '../Cooperadora/cooperadora-model';
import { PersonaRUCEModel } from '../../../../ref-ruce/Model/persona-ruce-model';

export class AutoridadCooperadoraModel extends BaseModel {
    static className: string = 'autoridades_cooperadoras';
    constructor(
        public fk_persona?: PersonaRUCEModel,
        public fk_cooperadora?: CooperadoraModel,
        public cargo?: string,
        public inicio_cargo?: Date,
        public fin_cargo?: Date,
        public tipo_comision?: string,

    ) {
        super();
    }
}