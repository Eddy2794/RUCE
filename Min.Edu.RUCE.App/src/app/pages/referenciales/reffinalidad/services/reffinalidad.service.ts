import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '@app/shared/services';
import { environment } from '@environments/environment';
import { RefFinalidadModel } from '../model/reffinalidad.model';

@Injectable({
  providedIn: 'root'
})
export class RefFinalidadService extends BaseService<RefFinalidadModel> {

  constructor(http:HttpClient) {
    super(http,environment.apiConfigUrl,RefFinalidadModel.className);
  }
}
