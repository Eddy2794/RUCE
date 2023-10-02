import { Injectable } from '@angular/core';
import { BaseService } from '@app/shared/services';
import { PanelModel } from '../Model/panel-model';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PanelService extends BaseService<PanelModel> {

  constructor(http: HttpClient){
    super(http, environment.apiRuceUrl, PanelModel.className);
  }
}
