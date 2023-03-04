import { TestBed } from '@angular/core/testing';

import { CooperadoraServiceService } from './cooperadora-service.service';

describe('CooperadoraServiceService', () => {
  let service: CooperadoraServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CooperadoraServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
