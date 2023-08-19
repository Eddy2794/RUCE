import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BalanceModel } from '../Model/balance-model';

import { environment } from '@environments/environment';
import { BaseService } from '@app/shared/services';

@Injectable({
  providedIn: 'root'
})
export class BalanceService extends BaseService<BalanceModel> {

  constructor(http: HttpClient){
    super(http, environment.apiRuceUrl, BalanceModel.className);
  }
}
