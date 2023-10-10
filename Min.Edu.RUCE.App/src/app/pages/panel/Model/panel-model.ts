import { BaseModel } from "@app/_models/base.model";

export class PanelModel extends BaseModel {
    static className: string = 'panel';
    constructor(
        public totalCooperadoras?: number,
        public totalInstituciones?: number,
        public coopPersoneria?: number,
        public coopExpediente?: number,
        public instSinCoop?: number,
        public coopConstancias?: number,
        public instCoop?:number,

    ) {
        super();
    }
}
