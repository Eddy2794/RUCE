import { BaseModel } from '@app/_models/base.model';
import { ReftipocomisionModel } from '@app/pages/ruce/refruce/Model/reftipocomision-model';
import { CooperadoraModel } from '../../cooperadora/Models/cooperadora-model';

export class ComisionModel extends BaseModel {
    public static className: string = "comision";
    constructor(
        public fkCooperadora?: CooperadoraModel,
        public fkRefTipoComision?: ReftipocomisionModel,
        public periodoInicio?: Date,
        public periodoFin?: Date,
        public nroSocios?: number,
        public estadoResolucion?: string,
        public estaActivo?: boolean,
        public idUsuarioAlta?: number,
        public idUsuarioModificacion?: number,
        public ref_tipo_comision?: ReftipocomisionModel
    ) {
        super();
    }
}
