import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ExpedienteModel } from '../Models/expediente-model';
import { environment } from '@environments/environment';
import { BaseService } from '@app/shared/services';

@Injectable({
  providedIn: 'root'
})
export class ExpedienteService extends BaseService<ExpedienteModel>{

  constructor(private http: HttpClient){
    super(http, environment.apiRuceUrl, ExpedienteModel.className);
  }
}
