import { CooperadoraModel } from './../Cooperadora/cooperadora-model';
import { PersonaModel } from './../Persona/persona-model';
export class AutoridadCooperadoraModel {
    _id!: number;
    fk_persona!: PersonaModel;
    fk_cooperadora!: CooperadoraModel;
    cargo!: string;
    inicio_cargo!: Date;
    fin_cargo!: Date;
    tipo_comision!: string;
}
