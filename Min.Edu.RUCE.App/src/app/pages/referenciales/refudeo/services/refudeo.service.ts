import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '@app/shared/services';
import { environment } from '@environments/environment';
import { RefUdeOModel } from '../model/refudeo.model';


@Injectable({
  providedIn: 'root'
})
export class RefUdeOService extends BaseService<RefUdeOModel>{

  constructor(http: HttpClient) {
    super(http, environment.apiConfigUrl, RefUdeOModel.className);
  }
}
