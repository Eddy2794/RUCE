import { TestBed } from '@angular/core/testing';

import { ReftituloService } from './reftitulo.service';

describe('ReftituloService', () => {
  let service: ReftituloService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReftituloService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
