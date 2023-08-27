import { TestBed } from '@angular/core/testing';

import { RefTipoFondoService } from './reftipofondo.service';

describe('RefTipoFondoService', () => {
  let service: RefTipoFondoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RefTipoFondoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
