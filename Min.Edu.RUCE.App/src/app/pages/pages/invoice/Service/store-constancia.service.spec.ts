import { TestBed } from '@angular/core/testing';

import { StoreConstanciaService } from './store-constancia.service';

describe('StoreConstanciaService', () => {
  let service: StoreConstanciaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoreConstanciaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
