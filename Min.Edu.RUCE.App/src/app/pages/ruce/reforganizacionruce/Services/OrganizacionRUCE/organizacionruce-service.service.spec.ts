import { TestBed } from '@angular/core/testing';

import { OrganizacionRUCEService } from './organizacionruce-service.service';

describe('EstablecimientoServiceService', () => {
  let service: OrganizacionRUCEService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrganizacionRUCEService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
