import { TestBed } from '@angular/core/testing';

import { RefjornadaService } from './refjornada.service';

describe('RefjornadaService', () => {
  let service: RefjornadaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RefjornadaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
