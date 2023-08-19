import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { BaseService } from "@app/shared/services";
import { MatriculaModel } from "../Models/matricula-model";


@Injectable({
    providedIn: 'root'
  })

export class MatriculaService extends BaseService<MatriculaModel> {
    constructor(http: HttpClient){
        super(http, environment.apiRuceUrl, MatriculaModel.className);
      }
}
