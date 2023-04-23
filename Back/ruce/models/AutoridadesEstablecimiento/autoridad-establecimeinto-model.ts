import { EstablecimientoModel } from '../Establecimiento/establecimiento-model';
import { PersonaModel } from './../Persona/persona-model';
export class AutoridadEstablecimeintoModel {
    id!: number;
    cargo!: string;
    fkIdPersonaRUCE!: PersonaModel;
    fk_establecimiento!: EstablecimientoModel;
}
