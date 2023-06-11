import { BaseModel } from "@app/_models/base.model";

export class RefEjercicioModel extends BaseModel {
    static className: string = 'RefEjercicio';
    constructor(
        public ejercicioDesc?: string,
        public esPredeterminado?: boolean
        ) {
        super();
    }
}