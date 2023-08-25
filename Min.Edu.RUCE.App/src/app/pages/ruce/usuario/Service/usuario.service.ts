import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '@app/shared/services';
import { environment } from '@environments/environment';
import { UsuarioModel } from '../Model/usuario-model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends BaseService<UsuarioModel> {

  constructor(http: HttpClient){
    super(http, environment.apiRuceUrl, UsuarioModel.className);
  }
}
