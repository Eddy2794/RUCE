import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '@app/shared/services';
import { environment } from '@environments/environment';
import { RefFinalidadxejerModel } from '../model/reffinalidadxejer.model';

@Injectable({
  providedIn: 'root'
})
export class RefFinalidadxejerService extends BaseService<RefFinalidadxejerModel> {

  constructor(http: HttpClient) {
    super(http, environment.apiConfigUrl, RefFinalidadxejerModel.className);
  }
}
