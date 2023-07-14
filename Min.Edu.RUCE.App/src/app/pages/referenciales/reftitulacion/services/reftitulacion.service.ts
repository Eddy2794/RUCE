import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '@app/shared/services';
import { environment } from '@environments/environment';
import { RefTitulacionModel } from '../model/reftitulacion.model';

@Injectable({
  providedIn: 'root'
})
export class ReftitulacionService extends BaseService<RefTitulacionModel> {

  constructor(http: HttpClient) {
    super(http,environment.apiConfigUrl,RefTitulacionModel.className);
  }
}
