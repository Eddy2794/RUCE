import { BaseModel } from "@app/_models/base.model";

export class ConstanciaModel extends BaseModel{
    public static className: string = "informe_gral";
    constructor(
        public id?: number,
        public fkCooperadora?: number,
        public datos?: Array<any>,
        public esReporte?: boolean,
        public estaActivo?: boolean,
        public idUsuarioAlta?: number,
        public idUsuarioModificacion?: number
    ){
        super();
    }
}
