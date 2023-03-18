import { TestBed } from '@angular/core/testing';

import { RefniveleducativoService } from './refniveleducativo.service';

describe('RefniveleducativoService', () => {
  let service: RefniveleducativoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RefniveleducativoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
