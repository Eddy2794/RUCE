import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '@app/shared/services';
import { environment } from '@environments/environment';
import { RefTipoOrganizacionModel } from '../model/reftipoorganizacion.model';

@Injectable({
  providedIn: 'root',
})
export class ReftipoorganizacionService extends BaseService<RefTipoOrganizacionModel> {
  constructor(http: HttpClient) {
    super(http, environment.apiConfigUrl, RefTipoOrganizacionModel.className);
  }
}
