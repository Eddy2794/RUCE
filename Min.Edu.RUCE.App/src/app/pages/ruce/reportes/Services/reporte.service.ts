import { Injectable } from '@angular/core';
import { InformeGral } from '../Models/InformeGral';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '@app/shared/services';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InformeGralService  extends BaseService<InformeGral>{
  constructor(private http: HttpClient){
    super(http, environment.apiRuceUrl, InformeGral.className);
  }
}
