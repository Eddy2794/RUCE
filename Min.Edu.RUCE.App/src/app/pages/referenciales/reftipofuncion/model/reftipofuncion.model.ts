
import { BaseModel } from "@app/_models/base.model";

export class RefTipoFuncionModel extends BaseModel {
  static className: string = 'RefTipoFuncion';
  constructor(
    public tipoFuncionDesc?: string,
  ) {
    super();
  }
}
