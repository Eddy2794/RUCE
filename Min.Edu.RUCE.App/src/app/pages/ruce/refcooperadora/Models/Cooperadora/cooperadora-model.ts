import { BaseModel } from '@app/_models/base.model';
import { EstablecimientoModel } from '../../../refestablecimiento/Models/Establecimiento/establecimiento-model';
import { KioscoModel } from './../Kiosco/kiosco-model';

export class CooperadoraModel extends BaseModel {
    static className: string = 'cooperadoras';
    constructor(
        public denominacion?: string,
        public estado?: string,
        public legajo?: string,
        public decreto?: string,
        public convenioScEconomicas?: boolean,
        public inscripcion_afip?: boolean,
        public inscripcion_rentas?: boolean,
        public inscripcion_renacopes?: boolean,
        public idOrganizacionRUCE?: EstablecimientoModel,
        public fk_kiosco?: KioscoModel,

    ) {
        super();
    }
}
