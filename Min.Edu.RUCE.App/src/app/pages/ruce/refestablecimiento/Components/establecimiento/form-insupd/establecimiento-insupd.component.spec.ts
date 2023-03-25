import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstablecimientoInsupdComponent } from './establecimiento-insupd.component';

describe('EstablecimientoInsupdComponent', () => {
  let component: EstablecimientoInsupdComponent;
  let fixture: ComponentFixture<EstablecimientoInsupdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstablecimientoInsupdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstablecimientoInsupdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
