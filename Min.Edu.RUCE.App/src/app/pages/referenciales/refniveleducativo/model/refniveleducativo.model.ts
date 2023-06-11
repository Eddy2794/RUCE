import { BaseModel } from "@app/_models/base.model";


export class RefniveleducativoModel extends BaseModel {
    static className: string = 'RefNivelEducativo';
    constructor(
        public id?: number,
        public idRefGrupoNivel?: number,
        public nivelEducativoDesc?: string
    ) {
        super();
    }
}