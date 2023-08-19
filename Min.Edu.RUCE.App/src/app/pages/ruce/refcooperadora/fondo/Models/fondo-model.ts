import { BaseModel } from "@app/_models/base.model";
import { RefTipoFondoModel } from "@app/pages/ruce/ref-ruce/Model/reftipofondo-model";
import { CooperadoraModel } from "../../cooperadora/Models/cooperadora-model";

export class FondoModel extends BaseModel  {
    static className: string = 'fondo';
    constructor(
        public id?: number,
        public fkTipoFondo?: RefTipoFondoModel,
        public fkCooperadora?: CooperadoraModel,
        public fondoRecibido?: boolean,
        public fondoRendido?: boolean,
        public monto?: number,
        public fechaRecibido?: Date,
        public fechaRendicion?: Date,
        public anioOtorgado?: number,
        public estaActivo?: boolean,
        public idUsuarioAlta?: number,
        public idUsuarioModificacion?: number,
    ) {
        super();
    }
}
