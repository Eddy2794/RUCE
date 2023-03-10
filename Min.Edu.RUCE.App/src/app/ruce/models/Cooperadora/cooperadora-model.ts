import { EstablecimientoModel } from '../Establecimiento/establecimiento-model';
import { KioscoModel } from './../Kiosco/kiosco-model';
export class CooperadoraModel {
    _id!: number;
    denominacion!: string;
    estado!: string;
    legajo!: string;
    decreto!: string;
    convenio_sc_economicas!: boolean;
    inscripcion_afip!: boolean;
    inscripcion_rentas!: boolean;
    inscripcion_renacopes!: boolean;
    fk_establecimiento_educativo!: EstablecimientoModel;
    fk_kiosco!: KioscoModel;
    fecha_creacion!: Date;
    fecha_modificacion!: Date;
}
