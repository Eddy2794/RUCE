import { Injectable } from '@angular/core';
import { BaseService } from '@app/shared/services';
import { ConstanciaModel } from '../Model/constancia-model';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StoreConstanciaService extends BaseService<ConstanciaModel> {

  constructor(private http: HttpClient){
    super(http, environment.apiRuceUrl, ConstanciaModel.className);
  }
}
