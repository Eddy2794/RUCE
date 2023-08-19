import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObserverValueService {


  constructor() { }

  private idValue = new BehaviorSubject(0);
  castValue = this.idValue.asObservable();
  private accionValue = new BehaviorSubject<string>('');
  castAccionValue = this.accionValue.asObservable();
  private tabIndex = new BehaviorSubject(0);
  castTabIndexValue = this.tabIndex.asObservable();

  sendValue(newValue) {
    this.idValue.next(newValue);
  }
  sendAccionValue(accionValue) {
    this.accionValue.next(accionValue);
  }
  sendTabIndexValue(tabIndexValue) {
    this.tabIndex.next(tabIndexValue);
  }
}
