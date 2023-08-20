import { TestBed } from '@angular/core/testing';

import { MovimientoExpedienteService } from './movimiento-expediente.service';

describe('MovimientoExpedienteService', () => {
  let service: MovimientoExpedienteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovimientoExpedienteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
