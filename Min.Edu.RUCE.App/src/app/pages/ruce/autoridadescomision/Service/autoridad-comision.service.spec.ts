import { TestBed } from '@angular/core/testing';

import { AutoridadComisionService } from './autoridad-comision.service';

describe('AutoridadCooperadoraService', () => {
  let service: AutoridadComisionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutoridadComisionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
