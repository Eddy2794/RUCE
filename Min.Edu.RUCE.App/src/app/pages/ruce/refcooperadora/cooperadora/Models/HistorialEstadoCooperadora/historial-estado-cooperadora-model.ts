import { CooperadoraModel } from '../Cooperadora/cooperadora-model';
import { TipoAsociacionModel } from '../../../Models/TipoAsociacion/tipo-asociacion-model';
import { ExpedienteModel } from '../../../Models/Expediente/expediente-model';
import { BaseModel } from '@app/_models/base.model';

export class HistorialEstadoCooperadoraModel extends BaseModel {
    static className: string = 'historial_estados_coop';
    constructor(
        public fk_cooperadora?: CooperadoraModel,
        public fk_tipo_asociacion?: TipoAsociacionModel,
        public fk_expediente?: ExpedienteModel,

    ) {
        super();
    }
}
