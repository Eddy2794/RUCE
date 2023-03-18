import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '@app/shared/services';
import { environment } from '@environments/environment';
import { RefNivelEducativoModel } from '../model/refniveleducativo.model';

@Injectable({
  providedIn: 'root'
})
export class RefNivelEducativoService extends BaseService<RefNivelEducativoModel> {

  constructor(http: HttpClient) {
    super(http, environment.apiConfigUrl, RefNivelEducativoModel.className);

  }

}


