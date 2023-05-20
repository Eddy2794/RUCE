import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '@app/pages/organismos/shared/services';
import { Role } from '@app/_models/role.model';
import { environment } from '@environments/environment';

@Injectable({ providedIn: 'root' })
export class RoleService extends BaseService<Role> {
    constructor(http: HttpClient) {
        super(http, environment.apiPofUrl ,Role.className);
    }
}
