import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EstablecimientoModel } from 'src/app/models/Establecimiento/establecimiento-model';

@Injectable({
  providedIn: 'root'
})
export class EstablecimientoServiceService {

  baseUrl = 'http://127.0.0.1:8000/api/establecimiento_educativo';

  constructor(private http: HttpClient) { }

  public all(): Observable<any> {
    const httpOptions = {
      method: 'GET',
      headers: new HttpHeaders({}),
      params: new HttpParams({}),
    };
    return this.http.get(this.baseUrl , httpOptions);
  }

  public createEstablecimiento(establecimiento: EstablecimientoModel): Observable<any> {
    const httpOptions = {
      method: 'POST',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    let body = JSON.stringify(establecimiento);
    return this.http.post(this.baseUrl, body, httpOptions);
  }
  
}