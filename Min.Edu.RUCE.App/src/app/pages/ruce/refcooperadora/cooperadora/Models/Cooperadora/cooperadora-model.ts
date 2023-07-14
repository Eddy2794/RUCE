import { BaseModel } from '@app/_models/base.model';
import { OrganizacionRUCEModel } from '../../../../reforganizacionruce/organizacion/Models/OrganizacionRUCE/organizacionruce-model';
import { KioscoModel } from '../../../Models/Kiosco/kiosco-model';
import { RefTipoAsociacionModel } from '@app/pages/ruce/ref-ruce/Model/reftipoasociacion-model';

export class CooperadoraModel extends BaseModel {
    static className: string = 'cooperadora';
    constructor(

        public fkRefTipoAsociacion?: RefTipoAsociacionModel,
        public fkOrganizacionRUCE?: OrganizacionRUCEModel,
        public cuit?: string,
        public legajo?: string,
        public denominacion?: string,
        public estado?: string,
        public convenioCsEconomicas?: boolean,
        public estadoAfip?: boolean,
        public estadoRentas?: boolean,
        public inscripcionRenacopes?: boolean,

    ) {
        super();
    }
}
