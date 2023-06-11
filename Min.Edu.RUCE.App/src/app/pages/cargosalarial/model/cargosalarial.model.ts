import { BaseModel } from "@app/_models/base.model";
import { RefJornadaModel } from '../../referenciales/refjornada/model/refjornada.model';

export class CargoSalarialModel extends BaseModel {
    static className: string = 'CargoSalarial';
    constructor(
    public cargoSalarialDesc?: string,
    public idRefJornada?: number,
    public refJornada?: RefJornadaModel,
    public equivalenciaHoraria?: number,
    public ordenVisual?: number,
    ) {
        super();
    }
}