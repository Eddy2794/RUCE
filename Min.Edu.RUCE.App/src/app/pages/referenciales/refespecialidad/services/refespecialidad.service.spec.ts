import { TestBed } from '@angular/core/testing';

import { RefespecialidadService } from './refespecialidad.service';

describe('RefespecialidadService', () => {
  let service: RefespecialidadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RefespecialidadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
