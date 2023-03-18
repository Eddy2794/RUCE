import { CooperadoraModel } from '../Cooperadora/cooperadora-model';
import { TipoAsociacionModel } from '../../Models/TipoAsociacion/tipo-asociacion-model';
import { ExpedienteModel } from '../../Models/Expediente/expediente-model';
export class HistorialEstadoCooperadoraModel {
    id!: number;
    fk_cooperadora!: CooperadoraModel;
    fk_tipo_asociacion!: TipoAsociacionModel;
    fk_expediente!: ExpedienteModel;
    fecha_creacion!: Date;
    fecha_modificacion!: Date;
}
