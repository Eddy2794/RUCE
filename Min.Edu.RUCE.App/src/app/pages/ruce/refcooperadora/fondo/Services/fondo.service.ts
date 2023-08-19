import { HttpClient } from '@angular/common/http';
import { FondoModel } from './../Models/fondo-model';
import { Injectable } from '@angular/core';
import { BaseService } from '@app/shared/services';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FondoService extends BaseService<FondoModel>{

  constructor(private http: HttpClient){
    super(http, environment.apiRuceUrl, FondoModel.className);
  }
}