import { PersonaModel } from './../Persona/persona-model';
export class UsuarioModel {
    _id!: number;
    password!: string;
    username!: string;
    administrador!: boolean;
    fk_persona!: PersonaModel;
}
