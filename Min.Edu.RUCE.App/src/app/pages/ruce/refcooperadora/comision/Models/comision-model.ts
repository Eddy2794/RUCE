import { BaseModel } from '@app/_models/base.model';
import { ReftipocomisionModel } from '@app/pages/ruce/ref-ruce/Model/reftipocomision-model';
import { CooperadoraModel } from '../../cooperadora/Models/Cooperadora/cooperadora-model';

export class ComisionModel extends BaseModel {
    public static className: string = "comision";
    constructor(
        public fkCooperadora?: CooperadoraModel,
        public fkRefTipoComision?: ReftipocomisionModel,
        public periodoInicio?: Date,
        public periodoFin?: Date,
        public nroSocios?: number,
        public estadoResolucion?: boolean,
        public estaActivo?: boolean,
        public idUsuarioAlta?: number,
        public idUsuarioModificacion?: number
    ) {
        super();
    }
}
