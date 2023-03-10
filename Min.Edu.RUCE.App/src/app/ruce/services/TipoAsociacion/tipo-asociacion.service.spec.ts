import { TestBed } from '@angular/core/testing';

import { TipoAsociacionService } from './tipo-asociacion.service';

describe('TipoAsociacionService', () => {
  let service: TipoAsociacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoAsociacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
