import { EstablecimientoModel } from '../../../establecimientos/models/Establecimiento/establecimiento-model';
import { PersonaModel } from './../Persona/persona-model';
export class AutoridadEstablecimeintoModel {
    _id!: number;
    cargo!: string;
    fk_persona!: PersonaModel;
    fk_establecimiento!: EstablecimientoModel;
}
