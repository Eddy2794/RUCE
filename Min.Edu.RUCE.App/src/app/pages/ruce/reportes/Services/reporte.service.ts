import { Injectable } from '@angular/core';
import { InformeGralModel } from '../Models/InformeGral-model';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '@app/shared/services';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InformeGralService  extends BaseService<InformeGralModel>{
  constructor(private http: HttpClient){
    super(http, environment.apiRuceUrl, InformeGralModel.className);
  }
}
