import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '@app/shared/services';
import { environment } from '@environments/environment';
import { RefTipoFuncionModel } from '../model/reftipofuncion.model';

@Injectable({
  providedIn: 'root'
})
export class ReftipofuncionService extends BaseService<RefTipoFuncionModel> {

  constructor(http: HttpClient) {
    super(http, environment.apiConfigUrl, RefTipoFuncionModel.className);
  }
}
