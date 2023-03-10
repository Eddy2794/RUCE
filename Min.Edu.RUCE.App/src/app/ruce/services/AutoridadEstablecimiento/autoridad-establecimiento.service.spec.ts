import { TestBed } from '@angular/core/testing';

import { AutoridadEstablecimientoService } from './autoridad-establecimiento.service';

describe('AutoridadEstablecimientoService', () => {
  let service: AutoridadEstablecimientoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutoridadEstablecimientoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
