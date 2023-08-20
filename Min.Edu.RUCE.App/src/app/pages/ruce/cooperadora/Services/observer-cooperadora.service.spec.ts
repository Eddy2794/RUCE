import { TestBed } from '@angular/core/testing';

import { ObserverCooperadoraService } from './observer-cooperadora.service';

describe('ObserverCooperadoraService', () => {
  let service: ObserverCooperadoraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObserverCooperadoraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
