import { ExpedienteModel } from './../Expediente/expediente-model';
import { CooperadoraTipoAsociacionModel } from './../CooperadoraTipoAsociacion/cooperadora-tipo-asociacion-model';
export class HistorialEstadoCooperadoraModel {
    _id!: number;
    fk_cooperadora_tipo_asociacion!: CooperadoraTipoAsociacionModel;
    fk_expediente!: ExpedienteModel;
    fecha_creacion!: Date;
    fecha_modificacion!: Date;
}
