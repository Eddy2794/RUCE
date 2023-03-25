import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EstablecimientoModel } from '../../Models/Establecimiento/establecimiento-model';

import { environment } from '@environments/environment';
import { BaseService } from '@app/shared/services';

@Injectable({
  providedIn: 'root'
})
export class EstablecimientoService extends BaseService<EstablecimientoModel>{
  constructor(private http: HttpClient){
    super(http, environment.apiRuceUrl, EstablecimientoModel.className);
  }
}

//   private baseUrl: string = environment.apiRuceUrl;

//   constructor(private http: HttpClient) { 
//     this.baseUrl += EstablecimientoModel.className;
//   }

//   public all(): Observable<any> {
//     const httpOptions = {
//       method: 'GET',
//       headers: new HttpHeaders({}),
//       params: new HttpParams({}),
//     };
//     return this.http.get(this.baseUrl , httpOptions);
//   }

//   public create(establecimiento: EstablecimientoModel): Observable<any> {
//     const httpOptions = {
//       method: 'POST',
//       headers: new HttpHeaders({
//         'Content-Type': 'application/json',
//       }),
//     };
//     let body = JSON.stringify(establecimiento);
//     return this.http.post(this.baseUrl, body, httpOptions);
//   }

//   public get(id: number): Observable<any> {
//     const httpOptions = {
//       method: 'GET',
//       headers: new HttpHeaders({}),
//       params: new HttpParams({}),
//     };
//     return this.http.get(this.baseUrl + id, httpOptions);
//   }

//   public update(id: number, establecimiento: EstablecimientoModel) {
//     const httpOptions = {
//       method: 'PUT',
//       headers: new HttpHeaders({
//         'Content-Type': 'application/json',
//       }),
//     };
//     let body = JSON.stringify(establecimiento);
//     return this.http.put(this.baseUrl + id, body, httpOptions);
//   }

//   public delete(id: number) {
//     const httpOptions = {
//       method: 'DELETE',
//       headers: new HttpHeaders({}),
//       params: new HttpParams({}),
//     };
//     return this.http.delete(this.baseUrl + id, httpOptions);
//   }
  
// }