import { TestBed } from '@angular/core/testing';

import { AutoridadCooperadoraService } from './autoridad-cooperadora.service';

describe('AutoridadCooperadoraService', () => {
  let service: AutoridadCooperadoraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutoridadCooperadoraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
