import { RefEspecialidadModel } from "@app/pages/referenciales/refespecialidad/model/refespecialidad.model";
import { RefModalidadDictadoModel } from "@app/pages/referenciales/refmodalidaddictado/model/refmodalidaddictado.model";
import { RefniveleducativoModel } from "@app/pages/referenciales/refniveleducativo/model/refniveleducativo.model";
import { RefTipoEducacionModel } from "@app/pages/referenciales/reftipoeducacion/model/reftipoeducacion.model";
import { RefTitulacionModel } from "@app/pages/referenciales/reftitulacion/model/reftitulacion.model";
import { BaseModel } from "@app/_models/base.model";

export class PlanEstudioBaseModel extends BaseModel {
    static className: string = 'planestudio';
    constructor(
        public planEstudioDesc?: string,
        public duracionAnios?: number,
        public duracionHsCatedra?: number,
        public duracionHsReloj?: number,
        public estaVigente?: boolean,
        public fechaAlta?: string,
        public fechaModificacion?: string,
        public estaConfirmado?: boolean,
        public seDivideEnCiclos?: boolean,
        public estaActivo?: boolean,
        
        public idPlanEstudioBase?: number,
        public idRefTipoEducacion?: number,
        public idRefTitulacion?: number,
        public idRefEspecialidad?: number,
        public idRefNivelEducativo?: number,
        public idRefModalidadDictado?: number,

        public planEstudioBase?: PlanEstudioBaseModel,
        public refEspecialidad?: RefEspecialidadModel,
        public refNivelEducativo?: RefniveleducativoModel,
        public refModalidadDictado?: RefModalidadDictadoModel,
        public refTipoEducacion?: RefTipoEducacionModel,
        public refTitulacion?: RefTitulacionModel
    ) {
        super();
    }
}