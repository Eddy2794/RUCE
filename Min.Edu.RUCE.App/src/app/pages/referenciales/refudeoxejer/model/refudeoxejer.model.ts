import { BaseModel } from "@app/_models/base.model";
import { RefEjercicioModel } from "../../refejercicio/model/refejercicio.model";
import { RefUdeOModel } from "../../refudeo/model/refudeo.model";

export class RefUdeOxEjerModel extends BaseModel {
    static className: string = 'RefUdeOxEjer';
    constructor(
        public idUdeO?: number,
        public refUdeO?: RefUdeOModel,
        public idEjercicio?: number,
        public refEjercicio?: RefEjercicioModel,
        public codUdeO?: string,

    ) {
        super();
    }
}