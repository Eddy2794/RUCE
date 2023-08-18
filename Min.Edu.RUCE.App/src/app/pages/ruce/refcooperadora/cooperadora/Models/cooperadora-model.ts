import { BaseModel } from '@app/_models/base.model';
import { OrganizacionRUCEModel } from '../../../reforganizacionruce/organizacion/Models/OrganizacionRUCE/organizacionruce-model';
import { RefTipoAsociacionModel } from '@app/pages/ruce/ref-ruce/Model/reftipoasociacion-model';
import { AtencionSeguimientoModel } from '../../atencion-seguimiento/Model/atencion-seguimiento-model';
import { RefTipoDocumentoModel } from '@app/pages/ruce/ref-ruce/Model/reftipodocumento-model';
import { FondoModel } from '../../fondo/Models/fondo-model';
import { ComisionModel } from '../../comision/Models/comision-model';
import { BalanceModel } from '../../balance/Model/balance-model';

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
        public estaActivo?: boolean,
        public idUsuarioAlta?: number,
        public idUsuarioModificacion?: number,
        public organizacion_r_u_c_e?: OrganizacionRUCEModel,
        public atencion_seguimiento?: AtencionSeguimientoModel,
        public ref_tipo_asociacion?: RefTipoDocumentoModel,
        public fondo?: FondoModel,
        public comision?: ComisionModel,
        public balance?: BalanceModel,

    ) {
        super();
    }
}
