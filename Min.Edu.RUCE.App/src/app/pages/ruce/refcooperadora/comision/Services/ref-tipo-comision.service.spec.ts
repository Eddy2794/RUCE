import { TestBed } from '@angular/core/testing';

import { RefTipoComisionService } from './ref-tipo-comision.service';

describe('RefTipoComisionService', () => {
  let service: RefTipoComisionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RefTipoComisionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
