import { BaseModel } from '@app/_models/base.model';
import { OrganizacionRUCEModel } from '../OrganizacionRUCE/organizacionruce-model';
import { PersonaRUCEModel } from '../../../persona-ruce/Model/persona-ruce-model';
import { RefCargoModel } from '../RefCargo/refcargo-model';

export class AutoridadOrganizacionRUCEModel extends BaseModel {
    static className: string = 'autoridadOrganizacionRUCE';
    constructor(
        public id?: number,
        public fkCargo?: RefCargoModel,
        public fkPersonaRUCE?: PersonaRUCEModel,
        public fkOrganizacionRUCE?: OrganizacionRUCEModel,
        public inicioCargo?: Date,
        public finCargo?: Date
    ) {
        super();
    }
}
