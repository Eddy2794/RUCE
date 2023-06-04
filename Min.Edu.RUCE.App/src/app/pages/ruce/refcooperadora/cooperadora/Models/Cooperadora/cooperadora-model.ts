import { BaseModel } from '@app/_models/base.model';
import { OrganizacionRUCEModel } from '../../../../reforganizacionruce/Models/OrganizacionRUCE/organizacionruce-model';
import { KioscoModel } from '../../../Models/Kiosco/kiosco-model';

export class CooperadoraModel extends BaseModel {
    static className: string = 'cooperadora';
    constructor(
        public denominacion?: string,
        public estado?: string,
        public legajo?: string,
        public decreto?: string,
        public convenioScEconomicas?: boolean,
        public inscripcion_afip?: boolean,
        public inscripcion_rentas?: boolean,
        public inscripcion_renacopes?: boolean,
        public idOrganizacionRUCE?: OrganizacionRUCEModel,
        public fk_kiosco?: KioscoModel,

    ) {
        super();
    }
}
