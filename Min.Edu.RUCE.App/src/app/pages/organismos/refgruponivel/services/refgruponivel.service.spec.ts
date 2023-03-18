import { TestBed } from '@angular/core/testing';

import { RefgruponivelService } from './refgruponivel.service';

describe('RefgruponivelService', () => {
  let service: RefgruponivelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RefgruponivelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
