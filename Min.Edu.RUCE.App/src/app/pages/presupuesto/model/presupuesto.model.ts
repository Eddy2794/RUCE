import { BaseModel } from "@app/_models/base.model";

export class PresupuestoModel extends BaseModel {
    static className: string = 'Presupuesto';
    constructor(
        public idCargoSalarial?: number,
        public idRefEscalafon?: number,
        public idRefAdicional?: number,
        public idRefUdeOxEjer?: number,
        public cantPresupuestada?: number,
        public idRefFinalidadxEjer?: number,
        public idRefFuncionxEjer?: number,
        public cantDisponible?: number,

    ) {
        super();
    }
}

