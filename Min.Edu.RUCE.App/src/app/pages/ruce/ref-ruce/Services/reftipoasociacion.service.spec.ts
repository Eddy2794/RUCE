import { TestBed } from '@angular/core/testing';

import { RefTipoAsociacionService } from './reftipoasociacion.service';

describe('RefTipoAsociacionServiceService', () => {
  let service: RefTipoAsociacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RefTipoAsociacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
