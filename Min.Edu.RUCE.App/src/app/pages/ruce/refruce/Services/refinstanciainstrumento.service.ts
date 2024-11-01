import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '@app/shared/services';
import { environment } from '@environments/environment';
import { RefInstanciaInstrumentoModel } from '../../refruce/Model/refinstanciainstrumento-model';

@Injectable({
  providedIn: 'root'
})
export class RefinstanciaInstrumentoService extends BaseService<RefInstanciaInstrumentoModel> {

  constructor(http: HttpClient) 
  {
    super(http, environment.apiRuceUrl, RefInstanciaInstrumentoModel.className);
  }
}
