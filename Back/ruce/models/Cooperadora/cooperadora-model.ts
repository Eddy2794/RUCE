import { EstablecimientoModel } from '../Establecimiento/establecimiento-model';
import { KioscoModel } from './../Kiosco/kiosco-model';
export class CooperadoraModel {
    id!: number;
    denominacion!: string;
    estado!: string;
    legajo!: string;
    decreto!: string;
    convenioScEconomicas!: boolean;
    inscripcion_afip!: boolean;
    inscripcion_rentas!: boolean;
    inscripcion_renacopes!: boolean;
    idOrganizacionRUCE!: EstablecimientoModel;
    fk_kiosco!: KioscoModel;
    fecha_creacion!: Date;
    fecha_modificacion!: Date;
}
