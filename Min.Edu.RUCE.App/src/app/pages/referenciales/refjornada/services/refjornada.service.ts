import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '@app/shared/services';
import { environment } from '@environments/environment';
import { RefJornadaModel } from '../model/refjornada.model';

@Injectable({
  providedIn: 'root'
})
export class RefjornadaService extends BaseService<RefJornadaModel> {

  constructor(http: HttpClient) {
    super(http, environment.apiConfigUrl, RefJornadaModel.className);
  }
}
