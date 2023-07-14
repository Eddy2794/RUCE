import { BaseModel } from "@app/_models/base.model";
import { RefEjercicioModel } from "../../refejercicio/model/refejercicio.model";
import { RefFuncionModel } from "../../reffuncion/model/reffuncion.model";

export class RefFuncionxejerModel extends BaseModel {
    static className: string = 'RefFuncionxejer';
    constructor(
        public refFuncion?: RefFuncionModel,
        public refEjercicio?: RefEjercicioModel,
        public codFuncion?: string,
    ) {
        super();
    }
}