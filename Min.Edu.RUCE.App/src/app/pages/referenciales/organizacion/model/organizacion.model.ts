import { BaseModel } from "@app/_models/base.model";
import { DateTime } from "luxon";
import { RefTipoOrganizacionModel } from "../../reftipoorganizacion/model/reftipoorganizacion.model";
export class OrganizacionModel extends BaseModel {
    static className: string = 'Organizacion';
    constructor(
        public organizacionDesc?: string,
        public codigoLiquidacion?: string,
        public idRefTipoOrganizacion?: number,
        public refTipoOrganizacion?: RefTipoOrganizacionModel,
        public idOrganizacionPadre?: number,
        public organizacionPadre?: OrganizacionModel,
        public cue?: number,
        public anexo?: number,
        public esEducativa?: boolean,
        public fechaCreacion?: string,
        public fechaAlta?: string,
        public fechaBaja?: string,
        public idRefJornada?: number,
        public idRefCategoriaOrganizacion?: number,
        public fechaChequeo?: string,
        public estaChequeada?: boolean,
        public idRefAmbito?: number,
        public idRefTipoPeriodoEscolar?: number,
        public idRefSubvencion?: number,
        public esConfesional?: boolean,
        public esArancelado?: boolean,
        public esInterna?: boolean,
        public paraGdocs?: boolean,
        public esEducacionDiferencial?: boolean,
        public porcSubvencion?: number,
        public fechaModificacion?: string,
        public idUsuarioAlta?: number,
        public idUsuarioModificacion?: number,
        public idRefSector?: number,
        public idRefEstadoOrganizacion?: number,
        public idRefTipoPermanencia?: number,

    ) {
        super();
    }
}
