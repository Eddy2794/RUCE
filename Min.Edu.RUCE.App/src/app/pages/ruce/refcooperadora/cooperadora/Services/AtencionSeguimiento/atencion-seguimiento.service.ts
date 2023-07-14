import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AtencionSeguimientoModel } from '../../Models/AtencionSeguimiento/atencion-seguimiento-model';

import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AtencionSeguimientoService {

  private baseUrl: string = environment.apiRuceUrl;

  constructor(private http: HttpClient) { 
    this.baseUrl +='/atencion_seguimiento/';
  }

  public all(): Observable<any> {
    const httpOptions = {
      method: 'GET',
      headers: new HttpHeaders({}),
      params: new HttpParams({}),
    };
    return this.http.get(this.baseUrl , httpOptions);
  }

  public create(atencionSeguimiento: AtencionSeguimientoModel): Observable<any> {
    const httpOptions = {
      method: 'POST',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    let body = JSON.stringify(atencionSeguimiento);
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

  public update(id: number, atencionSeguimiento: AtencionSeguimientoModel) {
    const httpOptions = {
      method: 'PUT',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    let body = JSON.stringify(atencionSeguimiento);
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