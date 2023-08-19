import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '@app/shared/services';
import { environment } from '@environments/environment';
import { RefTipoFondoModel } from '../../refruce/Model/reftipofondo-model';

@Injectable({
  providedIn: 'root'
})
export class RefTipoFondoService extends BaseService<RefTipoFondoModel> {

  constructor(http: HttpClient) 
  {
    super(http, environment.apiRuceUrl, RefTipoFondoModel.className);
  }
}
