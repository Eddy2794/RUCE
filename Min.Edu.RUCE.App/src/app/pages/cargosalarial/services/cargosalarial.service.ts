import { Injectable } from '@angular/core';
import { BaseService } from '@app/shared/services';
import { CargoSalarialModel } from '../model/cargosalarial.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CargosalarialService extends BaseService<CargoSalarialModel> {

  constructor(http: HttpClient) { 
    super (http, environment.apiPofUrl, CargoSalarialModel.className);
  }
}
