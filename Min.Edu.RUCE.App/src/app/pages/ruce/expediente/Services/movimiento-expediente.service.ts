import { HttpClient } from '@angular/common/http';
import { MovimientoExpedienteModel } from './../Models/movimiento-expediente-model';
import { Injectable } from '@angular/core';
import { BaseService } from '@app/shared/services';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovimientoExpedienteService extends BaseService<MovimientoExpedienteModel>{

  constructor(private http: HttpClient){
    super(http, environment.apiRuceUrl, MovimientoExpedienteModel.className);
  }
}