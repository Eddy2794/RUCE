import { TestBed } from '@angular/core/testing';

import { EstablecimientoServiceService } from './establecimiento-service.service';

describe('EstablecimientoServiceService', () => {
  let service: EstablecimientoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstablecimientoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
