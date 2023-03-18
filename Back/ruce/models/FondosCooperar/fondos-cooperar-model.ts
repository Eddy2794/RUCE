import { CooperadoraModel } from './../Cooperadora/cooperadora-model';
export class FondosCooperarModel {
    id!: number;
    fondos_recibidos!: boolean;
    fondos_rendidos!: boolean;
    estado_rendicion!: boolean;
    fecha_rendicion!: Date;
    anio_otorgado!: number;
    fk_cooperadora!: CooperadoraModel;
    fecha_creacion!: Date;
    fecha_modificacion!: Date;
}
