import { TestBed } from '@angular/core/testing';

import { ObserverComisionService } from './observer-comision.service';

describe('ObserverComisionService', () => {
  let service: ObserverComisionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObserverComisionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
