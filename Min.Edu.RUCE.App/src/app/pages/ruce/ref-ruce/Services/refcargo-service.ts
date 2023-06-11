import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '@app/shared/services';
import { environment } from '@environments/environment';
import { RefCargoModel } from "../../ref-ruce/Model/refcargo-model";

@Injectable({
    providedIn: 'root'
  })

export class RefcargoService extends BaseService<RefCargoModel>  {
    constructor(http: HttpClient)
    {
        super(http, environment.apiConfigUrl, RefCargoModel.className);
    }
}
