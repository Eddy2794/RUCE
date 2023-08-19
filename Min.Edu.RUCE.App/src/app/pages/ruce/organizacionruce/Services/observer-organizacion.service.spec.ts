import { TestBed } from '@angular/core/testing';

import { ObserverOrganizacionService } from './observer-organizacion.service';

describe('ObserverOrganizacionService', () => {
  let service: ObserverOrganizacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObserverOrganizacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
