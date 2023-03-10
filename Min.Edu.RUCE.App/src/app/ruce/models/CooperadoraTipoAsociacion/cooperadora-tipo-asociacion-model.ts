import { TipoAsociacionModel } from './../TipoAsociacion/tipo-asociacion-model';
import { CooperadoraModel } from './../Cooperadora/cooperadora-model';
export class CooperadoraTipoAsociacionModel {
    _id!: number;
    fk_tipo_asociacion!: TipoAsociacionModel;
    fk_cooperadora!: CooperadoraModel;
    fecha!: Date;
    fecha_creacion!: Date;
    fecha_modificacion!: Date;
}
