import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CooperadoraModel } from '../../Models/Cooperadora/cooperadora-model';

import { environment } from '@environments/environment';
import { BaseService } from '@app/shared/services';

@Injectable({
  providedIn: 'root'
})
export class CooperadoraService extends BaseService<CooperadoraModel>{
  constructor(private http: HttpClient){
    super(http, environment.apiRuceUrl, CooperadoraModel.className);
  }
}
  // export class CooperadoraService {
  // private baseUrl: string = environment.apiRuceUrl;

  // constructor(private http: HttpClient) { 
  //   this.baseUrl +='/cooperadoras/';
  // }

  // public all(): Observable<any> {
  //   const httpOptions = {
  //     method: 'GET',
  //     headers: new HttpHeaders({}),
  //     params: new HttpParams({}),
  //   };
  //   return this.http.get(this.baseUrl , httpOptions);
  // }

  // public create(cooperadora: CooperadoraModel): Observable<any> {
  //   const httpOptions = {
  //     method: 'POST',
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //     }),
  //   };
  //   let body = JSON.stringify(cooperadora);
  //   return this.http.post(this.baseUrl, body, httpOptions);
  // }

  // public get(id: number): Observable<any> {
  //   const httpOptions = {
  //     method: 'GET',
  //     headers: new HttpHeaders({}),
  //     params: new HttpParams({}),
  //   };
  //   return this.http.get(this.baseUrl + id, httpOptions);
  // }

  // public update(id: number, cooperadora: CooperadoraModel) {
  //   const httpOptions = {
  //     method: 'PUT',
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //     }),
  //   };
  //   let body = JSON.stringify(cooperadora);
  //   return this.http.put(this.baseUrl + id, body, httpOptions);
  // }

  // public delete(id: number) {
  //   const httpOptions = {
  //     method: 'DELETE',
  //     headers: new HttpHeaders({}),
  //     params: new HttpParams({}),
  //   };
  //   return this.http.delete(this.baseUrl + id, httpOptions);
  // }
  // }
