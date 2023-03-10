import { CooperadoraModel } from './../Cooperadora/cooperadora-model';
export class SeguimientoAtencionModel {
    _id!: number;
    llamadas!: number;
    mensajes!: number;
    email_enviados!: number;
    atencion_oficina!: number;
    atencion_territorial!: number;
    fk_cooperadora!: CooperadoraModel;
    fecha!: Date;
    fecha_creacion!: Date;
    fecha_modificacion!: Date;
}
