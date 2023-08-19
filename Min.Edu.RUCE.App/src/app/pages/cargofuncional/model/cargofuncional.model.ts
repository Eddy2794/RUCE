import { RefTipoFuncionModel } from './../../referenciales/reftipofuncion/model/reftipofuncion.model';
import { BaseModel } from "@app/_models/base.model";

export class CargoFuncionalModel extends BaseModel {
  static className: string = "CargoFuncional";
  constructor(
    public cargoFuncionalDesc?: string,
    public idRefTipoFuncion?: number,
    public refTipoFuncion?: RefTipoFuncionModel,
    public ordenVisual?: number,
    public equivalenciaHoraria?: number,
    public esJerarquico?: boolean
  ) {
    super();
  }
}
