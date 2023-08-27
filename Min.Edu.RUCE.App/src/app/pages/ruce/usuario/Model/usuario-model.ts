import { BaseModel } from "@app/_models/base.model";
import { PersonaRUCEModel } from "../../refruce/Model/persona-ruce-model";

export class UsuarioModel extends BaseModel {

    static className: string = 'usuario';
    constructor(
        public id?: number,
        public fkPersonaRUCE?: PersonaRUCEModel,
        public password?: string,
        public username?: string,
    ) {
        super();
    }
}
