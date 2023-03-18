import { BaseModel } from './base.model';
import { Role } from './role.model';

export class User extends BaseModel {
    static className: string = 'User';

    constructor(
        public lastname?: string,
        public firstname?: string,
        public cuit?: string,
        public dni?: string,
        public address?: string,
        public phone?: string,
        public email?: string,
        public username?: string,
        public password?: string,
        public status?: boolean,
        public roleId?: string,
        public role?: Role,
        public image?: string,
        public token?: string,
        public fullname?: string,
    ){
        super();  
    }
}
