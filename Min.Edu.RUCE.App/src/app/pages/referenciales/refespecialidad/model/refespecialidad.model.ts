import { BaseModel } from "@app/_models/base.model";

export class RefEspecialidadModel extends BaseModel {
    static className: string = 'RefEspecialidad';
    constructor(
        public especialidadDesc?: string,

        ) {
        super();
    }
}