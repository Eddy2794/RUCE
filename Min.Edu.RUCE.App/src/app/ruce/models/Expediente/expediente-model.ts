export class ExpedienteModel {
    id!: number;
    nro_expediente!: string;
    nro_resolucion!: string;
    observaciones!: boolean;
    observaciones_respondidas!: boolean;
    instrumento_publico!: boolean;
    fiscalia_estado!: boolean;
    fecha!: Date;
    fecha_creacion!: Date;
    fecha_modificacion!: Date;
}
