import { BaseModel } from "@app/_models/base.model";

export class RefJornadaModel extends BaseModel {
    static className: string = 'RefJornada';
    constructor(
        public jornadaDesc?: string,
        public nemotecnico?: string,
    ) {
        super();
    }
}