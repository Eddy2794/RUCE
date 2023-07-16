import { BaseModel } from "@app/_models/base.model";

export class ExpedienteModel extends BaseModel {
    static className: string = 'expedientes';
    constructor(
        public fkCooperadora?: string,
        public nroExpediente?: string,
        public cantObservaciones?: number,
        public observacionesDesc?: string,
        public observacionesRespondidas?: boolean,
        public estaActivo?: boolean,
        public idUsuarioAlta?: number,
        public idUsuarioModificacion?: number,
    ) {
        super();
    }
}