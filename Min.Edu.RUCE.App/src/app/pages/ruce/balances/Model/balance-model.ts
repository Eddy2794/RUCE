import { BaseModel } from "@app/_models/base.model";
import { CooperadoraModel } from "../../cooperadora/Models/cooperadora-model";

export class BalanceModel extends BaseModel {
    static className: string = 'balance';
    constructor(
        public id?: number,
        public fkCooperadora?: CooperadoraModel,
        public estadoBalance?: boolean,
        public anio?: number,
        public fecha?: Date,
        public estaActivo?: boolean,
        public idUsuarioAlta?: number,
        public idUsuarioModificacion?: number,

    ) {
        super();
    }
}
