import { BaseModel } from '@app/_models/base.model';
import { RefCargoModel } from '../../refruce/Model/refcargo-model';
import { PersonaRUCEModel } from '../../refruce/Model/persona-ruce-model';
import { OrganizacionRUCEModel } from '../../organizacionruce/Models/organizacionruce-model';


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
