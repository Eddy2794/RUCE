import { BaseModel } from '@app/_models/base.model';
import { OrganizacionRUCEModel } from '../OrganizacionRUCE/organizacionruce-model';
import { PersonaRUCEModel } from '../../../persona-ruce/Model/persona-ruce-model';

export class AutoridadOrganizacionRUCEModel extends BaseModel {
    static className: string = 'autoridades_org_ruce';
    constructor(
        public cargo?: string,
        public fk_persona?: PersonaRUCEModel,
        public fk_establecimiento?: OrganizacionRUCEModel,
    ) {
        super();
    }
}
