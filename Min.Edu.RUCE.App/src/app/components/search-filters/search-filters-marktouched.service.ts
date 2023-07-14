import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchFiltersMarktouchedService {

  constructor() { }

  private searchValue = new BehaviorSubject(false);
  castValue = this.searchValue.asObservable();

  sendValue(newValue) {
    this.searchValue.next(newValue);
  }
}
