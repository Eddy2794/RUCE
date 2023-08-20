import { TestBed } from '@angular/core/testing';

import { ReftipodocumentoService } from './reftipodocumento.service';

describe('ReftipodocumentoService', () => {
  let service: ReftipodocumentoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReftipodocumentoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
