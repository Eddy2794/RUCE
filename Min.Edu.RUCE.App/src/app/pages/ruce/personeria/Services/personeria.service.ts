import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PersoneriaModel } from '../Models/personeria-model';

import { environment } from '@environments/environment';
import { BaseService } from '@app/shared/services';

@Injectable({
  providedIn: 'root'
})
export class PersoneriaService extends BaseService<PersoneriaModel> {
  constructor(http: HttpClient){
    super(http, environment.apiRuceUrl, PersoneriaModel.className);
  }
}
