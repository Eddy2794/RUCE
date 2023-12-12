import { BaseModel } from "@app/_models/base.model";
import { CooperadoraModel } from "../../cooperadora/Models/cooperadora-model";

export class InformeGralModel  extends BaseModel {
    static className: string = 'informe_gral';
    constructor(
        public id?: number,
        public fkCooperadora?: string,
        public datos?: Array<CooperadoraModel>,
        public esReporte?: boolean,
    ) {
        super();
    }
}