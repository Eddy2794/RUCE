import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '@app/shared/services';
import { environment } from '@environments/environment';
import { PlanEstudioBaseModel } from '../model/planestudiobase.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlanestudiobaseService extends BaseService<PlanEstudioBaseModel> {

  constructor(http: HttpClient) {
    super(http, environment.apiOrganizacionUrl, PlanEstudioBaseModel.className);
   }

   confirmar( id: number): Observable<any> {
    return this.httpClient.patch<any>(this.apiUrl + '/' + this.endPoint + '/Confirmar/' + id, [
      {
        "operationType": 0,
        "path": "/EstaConfirmado",
        "op": "replace",
        "from": "",
        "value": "true"
      }
    ]) as Observable<any>;
  }
}
