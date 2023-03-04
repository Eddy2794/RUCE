import { ExpedienteModel } from './../Expediente/expediente-model';
export class PersoneriaModel {
    _id!: number;
    estado_comision_directiva!: boolean;
    estado_resolucion!: boolean;
    estado_balance!: boolean;
    fecha!: Date;
    fk_expediente!: ExpedienteModel;
    fecha_creacion!: Date;
    fecha_modificacion!: Date;
}
