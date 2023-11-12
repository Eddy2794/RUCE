import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConstanciaModel } from '../Model/constancia-model';
import { environment } from '@environments/environment';
import { BaseService } from '@app/shared/services';

@Injectable({
  providedIn: 'root'
})
export class CoopConstanciaService extends BaseService<ConstanciaModel>{

  constructor(private http: HttpClient){
    super(http, environment.apiRuceUrl, ConstanciaModel.className+'/coop_constancia');
  }
}
