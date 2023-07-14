import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '@app/shared/services';
import { environment } from '@environments/environment';
import { RefTipoEducacionModel } from '../model/reftipoeducacion.model';

@Injectable({
  providedIn: 'root'
})
export class ReftipoeducacionService extends BaseService<RefTipoEducacionModel> {

  constructor(http:HttpClient) {
    super(http,environment.apiConfigUrl,RefTipoEducacionModel.className);
  }
}
