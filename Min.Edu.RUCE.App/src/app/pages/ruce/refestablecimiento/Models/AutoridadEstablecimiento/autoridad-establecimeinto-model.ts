import { BaseModel } from '@app/_models/base.model';
import { EstablecimientoModel } from '../Establecimiento/establecimiento-model';
import { PersonaModel } from './../Persona/persona-model';

export class AutoridadEstablecimeintoModel extends BaseModel {
    static className: string = 'autoridades_est_edu';
    constructor(
        public cargo?: string,
        public fk_persona?: PersonaModel,
        public fk_establecimiento?: EstablecimientoModel,

    ) {
        super();
    }
}
