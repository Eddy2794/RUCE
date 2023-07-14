import { BaseModel } from '@app/_models/base.model';
import { OrganizacionRUCEModel } from '../../../organizacion/Models/OrganizacionRUCE/organizacionruce-model';
import { PersonaRUCEModel } from '../../../../ref-ruce/Model/persona-ruce-model';
import { RefCargoModel } from '../..../../../../../ref-ruce/Model/refcargo-model';

export class AutoridadOrganizacionRUCEModel extends BaseModel {
    static className: string = 'autoridad_organizacion';
    constructor(
        public id?: number,
        public fkRefCargo?: RefCargoModel,
        public fkPersonaRUCE?: PersonaRUCEModel,
        public fkOrganizacionRUCE?: OrganizacionRUCEModel,
        public inicioCargo?: Date,
        public finCargo?: Date
    ) {
        super();
    }
}
