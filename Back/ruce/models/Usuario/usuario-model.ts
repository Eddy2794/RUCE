import { PersonaModel } from './../Persona/persona-model';
export class UsuarioModel {
    id!: number;
    password!: string;
    username!: string;
    administrador!: boolean;
    fkIdPersonaRUCE!: PersonaModel;
}
