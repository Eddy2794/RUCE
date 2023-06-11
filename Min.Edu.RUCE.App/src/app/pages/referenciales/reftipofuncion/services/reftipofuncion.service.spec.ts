import { TestBed } from '@angular/core/testing';

import { ReftipofuncionService } from './reftipofuncion.service';

describe('ReftipofuncionService', () => {
  let service: ReftipofuncionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReftipofuncionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
