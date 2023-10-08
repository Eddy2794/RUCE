import { BaseModel } from "@app/_models/base.model";
import { OrganizacionRUCEModel } from "../../organizacionruce/Models/organizacionruce-model";

export class MatriculaModel extends BaseModel {
    static className: string = 'matricula';

    constructor(
        public id?: number,
        public fkOrganizacionRUCE?: OrganizacionRUCEModel,
        public periodoLectivo?: number,
        public matricula?: number,
        public fecha?: Date,
    ){
        super();
    }
}
