import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '@app/shared/services';
import { environment } from '@environments/environment';
import { RefEjercicioModel } from '../model/refejercicio.model';

@Injectable({
  providedIn: 'root'
})
export class RefEjercicioService extends BaseService<RefEjercicioModel> {

  constructor(http:HttpClient) {
    super(http,environment.apiConfigUrl,RefEjercicioModel.className);
   }
}
