import { TestBed } from '@angular/core/testing';

import { FondoCooperarService } from './fondo-cooperar.service';

describe('FondoCooperarService', () => {
  let service: FondoCooperarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FondoCooperarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
