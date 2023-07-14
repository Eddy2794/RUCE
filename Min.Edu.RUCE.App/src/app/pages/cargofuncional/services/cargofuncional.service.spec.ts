import { TestBed } from '@angular/core/testing';

import { CargofuncionalService } from './cargofuncional.service';

describe('CargofuncionalService', () => {
  let service: CargofuncionalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CargofuncionalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
