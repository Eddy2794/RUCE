import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '@app/shared/services';
import { environment } from '@environments/environment';
import { OrganizacionModel } from '../model/organizacion.model';

@Injectable({
  providedIn: 'root'
})
export class OrganizacionService extends BaseService<OrganizacionModel> {

  constructor(http: HttpClient) {
    super(http, environment.apiOrganizacionUrl, OrganizacionModel.className);

  }
}
