import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '@app/shared/services';
import { User } from '@app/_models/user.model';
import { environment } from '@environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService extends BaseService<User> {
    constructor(httpClient: HttpClient) {
        super(httpClient, environment.apiRuceUrl ,User.className);
    }
}
