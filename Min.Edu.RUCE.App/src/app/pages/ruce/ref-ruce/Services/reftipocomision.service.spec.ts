import { TestBed } from '@angular/core/testing';

import { ReftipocomisionService } from './reftipocomision.service';

describe('ReftipocomisionServiceService', () => {
  let service: ReftipocomisionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReftipocomisionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
