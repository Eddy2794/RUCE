import { CooperadoraModel } from './../Cooperadora/cooperadora-model';
import { PersonaModel } from './../Persona/persona-model';
export class AutoridadCooperadoraModel {
    id!: number;
    fkIdPersonaRUCE!: PersonaModel;
    fk_cooperadora!: CooperadoraModel;
    cargo!: string;
    inicio_cargo!: Date;
    fin_cargo!: Date;
    tipo_comision!: string;
}
