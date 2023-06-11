import { TestBed } from '@angular/core/testing';

import { ReftipoorganizacionService } from './reftipoorganizacion.service';

describe('ReftipoorganizacionService', () => {
  let service: ReftipoorganizacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReftipoorganizacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
