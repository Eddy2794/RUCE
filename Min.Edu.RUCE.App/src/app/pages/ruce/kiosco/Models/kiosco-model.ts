import { BaseModel } from "@app/_models/base.model";
import { PersonaRUCEModel } from "@app/pages/ruce/refruce/Model/persona-ruce-model";
import { CooperadoraModel } from "../../cooperadora/Models/cooperadora-model";

export class KioscoModel extends BaseModel {
    static className: string = 'kiosco';
    constructor(
        public fkCooperadora?: CooperadoraModel,
        public fkPersonaRUCE?: PersonaRUCEModel,
        public accesoLicitacion?: boolean,
        public documentacionPresentada?: boolean,
        public periodoInicio?: Date,
        public periodoFin?: Date,
        public estaActivo?: boolean,
        public idUsuarioAlta?: number,
        public idUsuarioModificacion?: number,
        public persona_r_u_c_e?: PersonaRUCEModel,
        public cooperadora?: CooperadoraModel,

    ) {
        super();
    }
}