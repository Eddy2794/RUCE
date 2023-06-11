import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '@app/shared/services';
import { environment } from '@environments/environment';
import { PresupuestoModel } from '../model/presupuesto.model';

@Injectable({
  providedIn: 'root'
})
export class PresupuestoService extends BaseService <PresupuestoModel> {

  constructor(http: HttpClient) {
    super(http,environment.apiPofUrl,PresupuestoModel.className);
   }
}



