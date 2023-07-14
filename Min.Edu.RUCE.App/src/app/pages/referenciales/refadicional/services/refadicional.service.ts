import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '@app/shared/services';
import { environment } from '@environments/environment';
import { RefAdicionalModel } from '../model/refadicional.model';

@Injectable({
  providedIn: 'root'
})
export class RefAdicionalService extends BaseService<RefAdicionalModel> {

  constructor(http: HttpClient) {
    super(http, environment.apiConfigUrl, RefAdicionalModel.className);
  }
}
