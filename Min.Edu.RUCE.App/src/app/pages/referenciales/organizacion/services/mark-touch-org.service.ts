import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarkTouchOrgService {

  constructor() { }
  private booleanValue = new BehaviorSubject(false);
  private idValue = new BehaviorSubject(0);
  castValue = this.booleanValue.asObservable();
  castValorId = this.idValue.asObservable();

  sendValue(newValue) {
    this.booleanValue.next(newValue);
    this.idValue.next(newValue);
  }
}
