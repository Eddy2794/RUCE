import { TestBed } from '@angular/core/testing';

import { PlazaService } from './plaza.service';

describe('PlazaService', () => {
  let service: PlazaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlazaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
