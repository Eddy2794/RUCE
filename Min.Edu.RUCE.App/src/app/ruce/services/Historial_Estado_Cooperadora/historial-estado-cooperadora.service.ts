import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HistorialEstadoCooperadoraModel } from 'src/app/ruce/models/HistorialEstadoCooperadora/historial-estado-cooperadora-model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HistorialEstadoCooperadoraService {

  baseUrl = environment.apiUrl+'historial_estados_coop';

  constructor(private http: HttpClient) { }

  public all(): Observable<any> {
    const httpOptions = {
      method: 'GET',
      headers: new HttpHeaders({}),
      params: new HttpParams({}),
    };
    return this.http.get(this.baseUrl , httpOptions);
  }

  public create(historialEstadoCooperadora: HistorialEstadoCooperadoraModel): Observable<any> {
    const httpOptions = {
      method: 'POST',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    let body = JSON.stringify(historialEstadoCooperadora);
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

  public update(id: number, historialEstadoCooperadora: HistorialEstadoCooperadoraModel) {
    const httpOptions = {
      method: 'PUT',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    let body = JSON.stringify(historialEstadoCooperadora);
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
