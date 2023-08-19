import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '@app/shared/services';
import { environment } from '@environments/environment';
import { RefUdeOxEjerModel } from '../model/refudeoxejer.model';

@Injectable({
  providedIn: 'root'
})
export class RefUdeOxEjerService extends BaseService<RefUdeOxEjerModel> {

  constructor(http: HttpClient) {
    super(http, environment.apiConfigUrl, RefUdeOxEjerModel.className);
  }
}
