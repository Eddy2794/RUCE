import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '@app/shared/services';
import { environment } from '@environments/environment';
import { RefModalidadDictadoModel } from '../model/refmodalidaddictado.model';

@Injectable({
  providedIn: 'root'
})
export class RefmodalidaddictadoService extends BaseService <RefModalidadDictadoModel> {

  constructor(http: HttpClient) {
    super(http, environment.apiConfigUrl, RefModalidadDictadoModel.className);
   }
}
