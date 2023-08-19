import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectService {
  selectOption!: any;
  private selectOptionsValue: BehaviorSubject<any> = new BehaviorSubject<any>(this.selectOption);
  selectMultipleOption!: any[];
  private selectMultipleOptionsValue: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(this.selectMultipleOption);
  aceptar!: boolean;
  private aceptarOpcion: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.aceptar);
  constructor() { }
  get obsSelect() {
    return this.selectOptionsValue.asObservable();
  }
  set setSelect(valor: any) {
    this.selectOptionsValue.next(valor);
  }
  get obsSelectMultiple() {
    return this.selectMultipleOptionsValue.asObservable();
  }
  set setMultipleSelect(valor: any) {
    this.selectMultipleOptionsValue.next(valor);
  }
}
