import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { BaseService } from '@app/shared/services';
import { AutoridadComisionModel } from '../Model/autoridad-comision-model';

@Injectable({
  providedIn: 'root'
})
export class AutoridadComisionService extends BaseService<AutoridadComisionModel> {
  constructor(http: HttpClient){
    super(http, environment.apiRuceUrl, AutoridadComisionModel.className);
  }
}
