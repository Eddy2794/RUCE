import { BaseModel } from "@app/_models/base.model";

export class KioscoModel extends BaseModel {
    static className: string = 'kioscos';
    constructor(
        public responsable?: string,
        public acceso_licitacion?: boolean,
        public documentacion_presentada?: boolean,
        public periodo_inicio?: Date,
        public periodo_fin?: Date,

    ) {
        super();
    }
}