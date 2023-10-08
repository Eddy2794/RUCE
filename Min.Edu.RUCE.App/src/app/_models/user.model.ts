import { BaseModel } from './base.model';
import { Role } from './role.model';

export class User extends BaseModel {
    static className: string = 'usuario';

    constructor(
        public userId?: string,
        public nombre?: string,
        public apellido?: string,
        public cuil?: string,
        public documento?: string,
        public telefono?: string,
        public email?: string,
        public username?: string,
        public password?: string,
        public role?: Role,
    ){
        super();  
    }
}
