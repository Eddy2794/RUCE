import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '@app/shared/services';
import { environment } from '@environments/environment';
import { RefTipoAsociacionModel } from '../../refruce/Model/reftipoasociacion-model';

@Injectable({
  providedIn: 'root'
})
export class RefTipoAsociacionService extends BaseService<RefTipoAsociacionModel> {

  constructor(http: HttpClient)
  {
    super(http, environment.apiRuceUrl, RefTipoAsociacionModel.className);
  }
}
