import { BaseModel } from "@app/_models/base.model";
import { RefEjercicioModel } from "../../refejercicio/model/refejercicio.model";
import { RefFinalidadModel } from "../../reffinalidad/model/reffinalidad.model";

export class RefFinalidadxejerModel extends BaseModel {
    static className: string = 'RefFinalidadxejer';
    constructor(
        public refFinalidad?: RefFinalidadModel,
        public idRefFinalidad?: number,
        public refEjercicio?: RefEjercicioModel,
        public idRefEjercicio?: number,
        public codFinalidad?: string,
    ) {
        super();
    }
}