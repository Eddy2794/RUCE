import { TestBed } from '@angular/core/testing';

import { CargosalarialService } from './cargosalarial.service';

describe('CargosalarialService', () => {
  let service: CargosalarialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CargosalarialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
