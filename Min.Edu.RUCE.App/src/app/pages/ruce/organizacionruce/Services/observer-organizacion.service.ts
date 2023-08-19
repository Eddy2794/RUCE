import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObserverOrganizacionService {

  constructor() { }
  private valueIdOrganizacion$ = new BehaviorSubject<number>(0);
  castIdIdOrganizacion = this.valueIdOrganizacion$.asObservable();


  enviarIdOrganizacion(nuevoValor) {
    this.valueIdOrganizacion$.next(nuevoValor);
  }
}
