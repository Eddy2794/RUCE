import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '@app/shared/services';
import { environment } from '@environments/environment';
import { PlazaModel } from '../model/plaza.model';

@Injectable({
  providedIn: 'root'
})
export class PlazaService extends BaseService<PlazaModel>{

  constructor(http: HttpClient) {
    super(http, environment.apiPofUrl, PlazaModel.className);
  }
}
