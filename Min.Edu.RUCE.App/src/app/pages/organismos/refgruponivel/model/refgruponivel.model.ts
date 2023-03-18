import { BaseModel } from "@app/_models/base.model";

export class RefGrupoNivelModel extends BaseModel {
    static className: string = 'RefGrupoNivel';
    constructor(
        public grupoDesc?: string,

    ) {
        super();
    }
}