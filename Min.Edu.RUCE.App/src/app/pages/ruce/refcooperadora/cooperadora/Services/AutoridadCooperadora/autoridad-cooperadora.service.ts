import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AutoridadCooperadoraModel } from '../../Models/AutoridadCooperadora/autoridad-cooperadora-model';

import { environment } from '@environments/environment';
import { BaseService } from '@app/shared/services';

@Injectable({
  providedIn: 'root'
})
export class AutoridadCooperadoraService extends BaseService<AutoridadCooperadoraModel> {
  constructor(http: HttpClient){
    super(http, environment.apiRuceUrl, AutoridadCooperadoraModel.className);
  }
}
