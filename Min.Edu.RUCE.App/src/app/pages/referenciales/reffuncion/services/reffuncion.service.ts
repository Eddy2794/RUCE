import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '@app/shared/services';
import { environment } from '@environments/environment';
import { RefFuncionModel } from '../model/reffuncion.model';

@Injectable({
  providedIn: 'root'
})
export class RefFuncionService extends BaseService<RefFuncionModel> {
  constructor(http:HttpClient) {
    super(http,environment.apiConfigUrl,RefFuncionModel.className);
  }
}
