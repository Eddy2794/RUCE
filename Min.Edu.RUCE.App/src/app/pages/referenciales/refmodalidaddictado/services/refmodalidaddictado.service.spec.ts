import { TestBed } from '@angular/core/testing';

import { RefmodalidaddictadoService } from './refmodalidaddictado.service';

describe('RefmodalidaddictadoService', () => {
  let service: RefmodalidaddictadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RefmodalidaddictadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
