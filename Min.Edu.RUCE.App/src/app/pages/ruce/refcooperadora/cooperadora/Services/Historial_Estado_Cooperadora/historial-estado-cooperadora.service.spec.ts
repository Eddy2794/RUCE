import { TestBed } from '@angular/core/testing';

import { HistorialEstadoCooperadoraService } from './historial-estado-cooperadora.service';

describe('HistorialEstadoCooperadoraService', () => {
  let service: HistorialEstadoCooperadoraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistorialEstadoCooperadoraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
