import { BaseModel } from '@app/_models/base.model';
import { RefTipoAsociacionModel } from '@app/pages/ruce/refruce/Model/reftipoasociacion-model';
import { ComisionModel } from '../../comision/Models/comision-model';
import { ExpedienteModel } from '../../expediente/Models/expediente-model';
import { FondoModel } from '../../fondo/Models/fondo-model';
import { OrganizacionRUCEModel } from '../../organizacionruce/Models/OrganizacionRUCE/organizacionruce-model';
import { AtencionSeguimientoModel } from '../../atencionseguimiento/Model/atencion-seguimiento-model';
import { BalanceModel } from '../../balances/Model/balance-model';

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

        public organizacion_r_u_c_e?: OrganizacionRUCEModel,
        public ref_tipo_asociacion?: RefTipoAsociacionModel,
        public atencion_seguimiento?: AtencionSeguimientoModel,
        public comision?: ComisionModel,
        public balance?: BalanceModel,
        public expediente?: ExpedienteModel,
        public fondo?: FondoModel,

        public idUsuarioAlta?: number,
        public idUsuarioModificacion?: number,

    ) {
        super();
    }
}
