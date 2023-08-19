import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '@app/shared/services';
import { environment } from '@environments/environment';
import { RefEspecialidadModel } from '../model/refespecialidad.model';

@Injectable({
  providedIn: 'root'
})
export class RefespecialidadService extends BaseService<RefEspecialidadModel> {

  constructor(http: HttpClient) {
    super(http, environment.apiConfigUrl, RefEspecialidadModel.className);
  }
}
