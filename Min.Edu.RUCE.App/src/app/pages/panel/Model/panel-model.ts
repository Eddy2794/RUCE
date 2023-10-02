import { BaseModel } from "@app/_models/base.model";

export class PanelModel extends BaseModel {
    static className: string = 'panel';
    constructor(
        public totalCooperadoras?: number,
        public totalInstituciones?: number,
        public coopPersonaria?: number,
        public coopExpediente?: number,
        public coopSinNovedad?: number,
        public coopConstancias?: number,
        public instCoop?:number,

    ) {
        super();
    }
}
