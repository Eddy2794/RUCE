import { TestBed } from '@angular/core/testing';

import { CooperadoraTipoAsociacionService } from './cooperadora-tipo-asociacion.service';

describe('CooperadoraTipoAsociacionService', () => {
  let service: CooperadoraTipoAsociacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CooperadoraTipoAsociacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
