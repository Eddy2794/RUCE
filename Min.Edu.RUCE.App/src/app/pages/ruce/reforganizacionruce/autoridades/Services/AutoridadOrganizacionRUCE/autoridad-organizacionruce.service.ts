import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '@app/shared/services';
import { environment } from '@environments/environment';
import { AutoridadOrganizacionRUCEModel } from '../../Models/AutoridadOrganizacionRUCE/autoridad-organizacionruce-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AutoridadOrganizacionRUCEService extends BaseService<AutoridadOrganizacionRUCEModel> {
  constructor(http: HttpClient){
    super(http, environment.apiRuceUrl, AutoridadOrganizacionRUCEModel.className);
  }
}
