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

  private valueTipoAsociacionDesc$ = new BehaviorSubject<string>("");
  castTipoAsociacionDesc = this.valueTipoAsociacionDesc$.asObservable();

  private valueIdExpediente$ = new BehaviorSubject<number>(0);
  castIdExpediente = this.valueIdExpediente$.asObservable();

  private valueIdPersoneria$ = new BehaviorSubject<number>(0);
  castIdPersoneria = this.valueIdPersoneria$.asObservable();

  private valueIdConstancia$ = new BehaviorSubject<number>(0);
  castIdConstancia = this.valueIdConstancia$.asObservable();


  enviarIdCooperadora(nuevoValor) {
    this.valueIdCooperadora$.next(nuevoValor);
  }

  enviarTipoAsociacion(nuevoValor) {
    this.valueTipoAsociacion$.next(nuevoValor);
  }

  enviarTipoAsociacionDesc(nuevoValor) {
    this.valueTipoAsociacionDesc$.next(nuevoValor);
  }

  enviarIdExpediente(nuevoValor){
    this.valueIdExpediente$.next(nuevoValor);
  }

  enviarIdPersoneria(nuevoValor){
    this.valueIdPersoneria$.next(nuevoValor);
  }

  enviarIdConstancia(nuevoValor){
    this.valueIdConstancia$.next(nuevoValor);
  }
}
