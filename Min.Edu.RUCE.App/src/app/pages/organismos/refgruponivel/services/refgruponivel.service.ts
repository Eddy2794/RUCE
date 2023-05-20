import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '@app/pages/organismos/shared/services';
import { environment } from '@environments/environment';
import { RefGrupoNivelModel } from '../model/refgruponivel.model';

@Injectable({
  providedIn: 'root'
})
export class RefGrupoNivelService extends BaseService<RefGrupoNivelModel> {

  constructor(http: HttpClient) {
    super(http, environment.apiConfigUrl, RefGrupoNivelModel.className);
  }
}


