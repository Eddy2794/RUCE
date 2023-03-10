import { CooperadoraModel } from '../Cooperadora/cooperadora-model';
import { TipoAsociacionModel } from '../TipoAsociacion/tipo-asociacion-model';
import { ExpedienteModel } from './../Expediente/expediente-model';
export class HistorialEstadoCooperadoraModel {
    _id!: number;
    fk_cooperadora!: CooperadoraModel;
    fk_tipo_asociacion!: TipoAsociacionModel;
    fk_expediente!: ExpedienteModel;
    fecha_creacion!: Date;
    fecha_modificacion!: Date;
}
