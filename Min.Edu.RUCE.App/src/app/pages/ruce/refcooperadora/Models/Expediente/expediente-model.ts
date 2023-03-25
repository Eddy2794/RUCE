import { BaseModel } from "@app/_models/base.model";

export class ExpedienteModel extends BaseModel {
    static className: string = 'expedientes';
    constructor(
        public nro_expediente?: string,
        public nro_resolucion?: string,
        public observaciones?: boolean,
        public observaciones_respondidas?: boolean,
        public instrumento_publico?: boolean,
        public fiscalia_estado?: boolean,
        public fecha?: Date,
    ) {
        super();
    }
}