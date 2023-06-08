import { BaseModel } from '@app/_models/base.model';
import { OrganizacionRUCEModel } from '../../../../reforganizacionruce/Models/OrganizacionRUCE/organizacionruce-model';
import { KioscoModel } from '../../../Models/Kiosco/kiosco-model';
import { TipoAsociacionModel } from '../../../Models/TipoAsociacion/tipo-asociacion-model';

export class CooperadoraModel extends BaseModel {
    static className: string = 'cooperadora';
    constructor(

        public fkRefTipoAsociacion?: TipoAsociacionModel,
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
