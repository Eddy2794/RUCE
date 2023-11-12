import { TestBed } from '@angular/core/testing';

import { CoopConstanciaService } from './coop-constancia.service';

describe('CoopConstanciaService', () => {
  let service: CoopConstanciaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoopConstanciaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
