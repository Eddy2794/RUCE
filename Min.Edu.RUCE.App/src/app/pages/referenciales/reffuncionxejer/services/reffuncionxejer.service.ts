import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '@app/shared/services';
import { environment } from '@environments/environment';
import { RefFuncionxejerModel } from '../model/reffuncionxejer.model';

@Injectable({
  providedIn: 'root'
})
export class RefFuncionxejerService extends BaseService<RefFuncionxejerModel> {

  constructor(http: HttpClient) {
    super(http, environment.apiConfigUrl, RefFuncionxejerModel.className);
  }
}