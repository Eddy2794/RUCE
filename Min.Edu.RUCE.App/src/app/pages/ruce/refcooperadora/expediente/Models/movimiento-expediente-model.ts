import { BaseModel } from "@app/_models/base.model";
import { ExpedienteModel } from "./expediente-model";
import { RefInstanciaInstrumentoModel } from "@app/pages/ruce/ref-ruce/Model/refinstanciainstrumento-model";

export class MovimientoExpedienteModel extends BaseModel  {
    static className: string = 'movimiento_expediente';
    constructor(

        public fkExpediente?: ExpedienteModel,
        public fkRefInstanciaInstrumento?: RefInstanciaInstrumentoModel,
        public estaActivo?: boolean,
        public idUsuarioAlta?: number,
        public idUsuarioModificacion?: number,

    ) {
        super();
    }
}
