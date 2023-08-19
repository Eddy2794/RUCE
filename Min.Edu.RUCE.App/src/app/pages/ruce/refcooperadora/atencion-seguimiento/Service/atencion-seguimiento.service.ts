import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AtencionSeguimientoModel } from '../Model/atencion-seguimiento-model';

import { environment } from '@environments/environment';
import { BaseService } from '@app/shared/services';

@Injectable({
  providedIn: 'root'
})
export class AtencionSeguimientoService extends BaseService<AtencionSeguimientoModel> {
  constructor(http: HttpClient){
    super(http, environment.apiRuceUrl, AtencionSeguimientoModel.className);
  }
}
