import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '@app/shared/services';
import { environment } from '@environments/environment';
import { ReftipocomisionModel } from '../Model/reftipocomision-model';

@Injectable({
  providedIn: 'root'
})
export class ReftipocomisionService extends BaseService<ReftipocomisionModel> {

  constructor(http: HttpClient) 
  {
    super(http, environment.apiRuceUrl, ReftipocomisionModel.className);
  }
}
