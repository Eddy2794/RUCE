import { BaseModel } from '@app/_models/base.model';

export class PersonaRUCEModel extends BaseModel {
    static className: string = 'persona_ruce';
    constructor(
        public cargo?: string,
        public inicio_cargo?: Date,
        public fin_cargo?: Date,
        public tipo_comision?: string,
    ) {
        super();
    }
}