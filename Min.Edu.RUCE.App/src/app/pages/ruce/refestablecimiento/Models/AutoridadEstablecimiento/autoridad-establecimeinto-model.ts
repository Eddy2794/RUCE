import { EstablecimientoModel } from '../Establecimiento/establecimiento-model';
// import { PersonaModel } from './../Persona/persona-model';
export class AutoridadEstablecimeintoModel {
    id!: number;
    cargo!: string;
    // fk_persona!: PersonaModel;
    fk_establecimiento!: EstablecimientoModel;
}
