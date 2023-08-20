import { Injectable } from '@angular/core';
import { AuditModel } from '../Model/audit-model';
import { BaseService } from '@app/shared/services';
import { environment } from '@environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuditService  extends BaseService<AuditModel> {
  constructor(http: HttpClient){
      super(http, environment.apiRuceUrl, AuditModel.className);
    }
}
