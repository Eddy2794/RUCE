import { TestBed } from '@angular/core/testing';

import { PersonaeriaService } from './personeria.service';

describe('PersonaeriaService', () => {
  let service: PersonaeriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonaeriaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});