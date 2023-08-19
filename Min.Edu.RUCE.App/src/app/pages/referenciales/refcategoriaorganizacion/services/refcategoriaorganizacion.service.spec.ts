import { TestBed } from '@angular/core/testing';

import { RefcategoriaorganizacionService } from './refcategoriaorganizacion.service';

describe('RefcategoriaorganizacionService', () => {
  let service: RefcategoriaorganizacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RefcategoriaorganizacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
