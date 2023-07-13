import { CooperadoraModel } from '../Cooperadora/cooperadora-model';
import { ExpedienteModel } from '../../../Models/Expediente/expediente-model';
import { BaseModel } from '@app/_models/base.model';
import { RefTipoAsociacionModel } from '@app/pages/ruce/ref-ruce/Model/reftipoasociacion-model';

export class HistorialEstadoCooperadoraModel extends BaseModel {
    static className: string = 'historial_estados_coop';
    constructor(
        public fk_cooperadora?: CooperadoraModel,
        public fk_tipo_asociacion?: RefTipoAsociacionModel,
        public fk_expediente?: ExpedienteModel,

    ) {
        super();
    }
}
