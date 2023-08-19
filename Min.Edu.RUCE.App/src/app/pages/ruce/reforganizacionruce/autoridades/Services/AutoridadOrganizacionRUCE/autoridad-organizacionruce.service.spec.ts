import { TestBed } from '@angular/core/testing';

import { AutoridadOrganizacionRUCEService } from './autoridad-organizacionruce.service';

describe('AutoridadOrganizacionRUCEService', () => {
  let service: AutoridadOrganizacionRUCEService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutoridadOrganizacionRUCEService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
