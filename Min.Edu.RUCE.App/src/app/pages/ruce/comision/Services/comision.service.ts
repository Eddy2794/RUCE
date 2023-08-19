import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '@app/shared/services';
import { environment } from '@environments/environment';
import { ComisionModel } from '../Models/comision-model';

@Injectable({
  providedIn: 'root'
})
export class ComisionService extends BaseService<ComisionModel> {
  constructor(http: HttpClient){
    super(http, environment.apiRuceUrl, ComisionModel.className);
  }
}
