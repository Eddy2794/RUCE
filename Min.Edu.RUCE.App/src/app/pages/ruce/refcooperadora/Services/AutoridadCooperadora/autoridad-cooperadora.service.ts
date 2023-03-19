import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AutoridadCooperadoraModel } from '../../Models/AutoridadCooperadora/autoridad-cooperadora-model';

import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AutoridadCooperadoraService {

  private baseUrl: string = environment.apiRuceUrl;

  constructor(private http: HttpClient) { 
    this.baseUrl +='/autoridades_cooperadoras/';
  }

  public all(): Observable<any> {
    const httpOptions = {
      method: 'GET',
      headers: new HttpHeaders({}),
      params: new HttpParams({}),
    };
    return this.http.get(this.baseUrl , httpOptions);
  }

  public create(autoridadCooperadora: AutoridadCooperadoraModel): Observable<any> {
    const httpOptions = {
      method: 'POST',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    let body = JSON.stringify(autoridadCooperadora);
    return this.http.post(this.baseUrl, body, httpOptions);
  }

  public get(id: number): Observable<any> {
    const httpOptions = {
      method: 'GET',
      headers: new HttpHeaders({}),
      params: new HttpParams({}),
    };
    return this.http.get(this.baseUrl + id, httpOptions);
  }

  public update(id: number, autoridadCooperadora: AutoridadCooperadoraModel) {
    const httpOptions = {
      method: 'PUT',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    let body = JSON.stringify(autoridadCooperadora);
    return this.http.put(this.baseUrl + id, body, httpOptions);
  }

  public delete(id: number) {
    const httpOptions = {
      method: 'DELETE',
      headers: new HttpHeaders({}),
      params: new HttpParams({}),
    };
    return this.http.delete(this.baseUrl + id, httpOptions);
  }
}
