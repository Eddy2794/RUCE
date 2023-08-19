import { TestBed } from '@angular/core/testing';

import { ReftipoeducacionService } from './reftipoeducacion.service';

describe('ReftipoeducacionService', () => {
  let service: ReftipoeducacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReftipoeducacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
