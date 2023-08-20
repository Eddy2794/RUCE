import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObserverCooperadoraService {

  constructor() { }
  private valueIdCooperadora$ = new BehaviorSubject<number>(0);
  castIdCooperadora = this.valueIdCooperadora$.asObservable();

  private valueTipoAsociacion$ = new BehaviorSubject<number>(0);
  castTipoAsociacion = this.valueTipoAsociacion$.asObservable();

  private valueIdExpediente$ = new BehaviorSubject<number>(0);
  castIdExpediente = this.valueIdExpediente$.asObservable();


  enviarIdCooperadora(nuevoValor) {
    this.valueIdCooperadora$.next(nuevoValor);
  }

  enviarTipoAsociacion(nuevoValor) {
    this.valueTipoAsociacion$.next(nuevoValor);
  }

  enviarIdExpediente(nuevoValor){
    this.valueIdExpediente$.next(nuevoValor);
  }
}
