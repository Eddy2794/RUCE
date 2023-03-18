import { RefGrupoNivelModel } from "@app/pages/organismos/refgruponivel/model/refgruponivel.model";
import { BaseModel } from "@app/_models/base.model";

export class RefNivelEducativoModel extends BaseModel {
    static className: string = 'RefNivelEducativo';
    constructor(
        public nivelEducativoDesc?: string,
        public idRefGrupoNivel?: number,
        public refGrupoNivel?: RefGrupoNivelModel,
        

    ) {
        super();
    }

}