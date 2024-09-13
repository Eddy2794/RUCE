import { TestBed } from '@angular/core/testing';

import { InformeGralService } from './reporte.service';

describe('ReporteService', () => {
  let service: InformeGralService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InformeGralService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
