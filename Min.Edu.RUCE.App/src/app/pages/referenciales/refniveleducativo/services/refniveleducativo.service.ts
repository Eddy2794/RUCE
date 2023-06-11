import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '@app/shared/services';
import { environment } from '@environments/environment';
import { RefniveleducativoModel } from '../model/refniveleducativo.model';

@Injectable({
  providedIn: 'root'
})
export class RefniveleducativoService extends BaseService<RefniveleducativoModel>{

  constructor(http: HttpClient) {
    super(http,environment.apiConfigUrl,RefniveleducativoModel.className);
    }
}