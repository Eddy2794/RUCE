import { BaseModel } from '@app/_models/base.model';
import { CooperadoraModel } from '../Cooperadora/cooperadora-model';

export class AtencionSeguimientoModel extends BaseModel {
    static className: string = 'atencion_seguimiento';
    constructor(
        public llamadas?: number,
        public mensajes?: number,
        public email_enviados?: number,
        public atencion_oficina?: number,
        public atencion_territorial?: number,
        public fk_cooperadora?: CooperadoraModel,
        public fecha?: Date,

    ) {
        super();
    }
}