import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '@app/shared/services';
import { CargoFuncionalModel } from '../model/cargofuncional.model';

@Injectable({
  providedIn: 'root'
})
export class CargofuncionalService extends BaseService<CargoFuncionalModel> {

  constructor(http: HttpClient) {
    super(http, environment.apiPofUrl, CargoFuncionalModel.className)
  }
}
