import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObserverComisionService {

  constructor() { }
  private valueIdComision$ = new BehaviorSubject<number>(0);
  castIdIdComision = this.valueIdComision$.asObservable();


  enviarIdComision(nuevoValor) {
    this.valueIdComision$.next(nuevoValor);
  }
}
