import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { RefTipoDocumentoModel } from '../../refruce/Model/reftipodocumento-model';
import { BaseService } from '@app/shared/services';

@Injectable({
  providedIn: 'root'
})
export class RefTipoDocumentoService extends BaseService<RefTipoDocumentoModel>  {

  constructor(http: HttpClient)
    {
        super(http, environment.apiRuceUrl, RefTipoDocumentoModel.className);
    }
}
