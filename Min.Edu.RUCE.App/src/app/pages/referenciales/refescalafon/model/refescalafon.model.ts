
import { BaseModel } from "@app/_models/base.model";
import { RefGrupoNivelModel } from "../../refgruponivel/model/refgruponivel.model";

export class RefEscalafonModel extends BaseModel {
    static className: string = 'RefEscalafon';
    constructor(
        public escalafonDesc?: string,
        public nomenclatura?: string,
        public idGrupoNivel?: number,
        public refGrupoNivel?: RefGrupoNivelModel,

    ) {
        super();
    }
}