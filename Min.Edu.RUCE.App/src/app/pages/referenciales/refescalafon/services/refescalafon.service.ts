import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '@app/shared/services';
import { environment } from '@environments/environment';
import { RefEscalafonModel } from '../model/refescalafon.model';

@Injectable({
  providedIn: 'root'
})
export class RefEscalafonService extends BaseService<RefEscalafonModel> {

  constructor(http: HttpClient) {
    super(http, environment.apiConfigUrl, RefEscalafonModel.className);
  }
}
