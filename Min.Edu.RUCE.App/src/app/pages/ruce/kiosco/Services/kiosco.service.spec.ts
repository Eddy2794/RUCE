import { TestBed } from '@angular/core/testing';

import { KioscoService } from './kiosco.service';

describe('KioscoService', () => {
  let service: KioscoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KioscoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
