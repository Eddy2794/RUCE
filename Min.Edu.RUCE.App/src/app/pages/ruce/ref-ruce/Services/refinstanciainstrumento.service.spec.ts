import { TestBed } from '@angular/core/testing';

import { RefinstanciainstrumentoService } from './refinstanciainstrumento.service';

describe('RefinstanciainstrumentoService', () => {
  let service: RefinstanciainstrumentoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RefinstanciainstrumentoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
