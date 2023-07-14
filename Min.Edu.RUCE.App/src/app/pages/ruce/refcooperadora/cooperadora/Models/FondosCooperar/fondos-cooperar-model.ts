import { BaseModel } from '@app/_models/base.model';
import { CooperadoraModel } from '../Cooperadora/cooperadora-model';

export class FondosCooperarModel extends BaseModel {
    static className: string = 'fondos_cooperar';
    constructor(
        public fondos_recibidos?: boolean,
        public fondos_rendidos?: boolean,
        public estado_rendicion?: boolean,
        public fecha_rendicion?: Date,
        public anio_otorgado?: number,
        public fk_cooperadora?: CooperadoraModel,

    ) {
        super();
    }
}
