import { BaseModel } from "@app/_models/base.model";
import { PersonaRUCEModel } from "@app/pages/ruce/refruce/Model/persona-ruce-model";
import { CooperadoraModel } from "../../cooperadora/Models/cooperadora-model";

export class AtencionSeguimientoModel extends BaseModel {
    static className: string = 'atencion_seguimiento';
    constructor(
        public id?: number,
        public fkCooperadora?: CooperadoraModel,
        public fkPersonaRUCE?: PersonaRUCEModel,
        public llamadas?: number,
        public mesajes?: number,
        public emailEnviados?: number,
        public atencionOficina?:number,
        public atencionTerritorial?:number,
        public observacion?: string,
        public fecha?: Date,
        public estaActivo?: boolean,
        public idUsuarioAlta?: number,
        public idUsuarioModificacion?: number,

    ) {
        super();
    }
}
