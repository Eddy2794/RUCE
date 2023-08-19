import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObserverPresupuestoService {

  constructor() { }
  private valueIdEjercicio$ = new BehaviorSubject<number>(0);
  castIdIdEjercicio = this.valueIdEjercicio$.asObservable();


  enviarIdEjercicio(nuevoValor) {
    this.valueIdEjercicio$.next(nuevoValor);
  }

}
