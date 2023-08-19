import { TestBed } from '@angular/core/testing';

import { AtencionSeguimientoService } from './atencion-seguimiento.service';

describe('AtencionSeguimientoService', () => {
  let service: AtencionSeguimientoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AtencionSeguimientoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
