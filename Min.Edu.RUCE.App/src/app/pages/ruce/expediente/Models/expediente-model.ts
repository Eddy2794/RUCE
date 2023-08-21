import { BaseModel } from "@app/_models/base.model";
import { CooperadoraModel } from "../../cooperadora/Models/cooperadora-model";
import { RefInstanciaInstrumentoModel } from "../../refruce/Model/refinstanciainstrumento-model";

export class ExpedienteModel extends BaseModel {
    static className: string = 'expediente';
    constructor(
        public fkCooperadora?: CooperadoraModel,
        public nroExpediente?: string,
        public cantObservaciones?: number,
        public observacionesDesc?: string,
        public observacionesRespondidas?: boolean,
        public estaActivo?: boolean,
        public idUsuarioAlta?: number,
        public idUsuarioModificacion?: number,
        public ref_instancia_instrumento?: RefInstanciaInstrumentoModel
    ) {
        super();
    }
}