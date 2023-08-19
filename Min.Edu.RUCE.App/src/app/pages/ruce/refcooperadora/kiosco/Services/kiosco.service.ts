import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { KioscoModel } from '../Models/kiosco-model';

import { environment } from '@environments/environment';
import { BaseService } from '@app/shared/services';

@Injectable({
  providedIn: 'root'
})
export class KioscoService extends BaseService<KioscoModel> {
  constructor(http: HttpClient){
    super(http, environment.apiRuceUrl, KioscoModel.className);
  }
}
