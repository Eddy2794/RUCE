import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '@app/shared/services';
import { environment } from '@environments/environment';
import { PersonaRUCEModel } from "../Model/persona-ruce-model";

@Injectable({
    providedIn: 'root'
  })

export class PersonaruceService extends BaseService<PersonaRUCEModel>  {
    constructor(http: HttpClient){
        super(http, environment.apiConfigUrl, PersonaRUCEModel.className);
    }
}
