import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoridadEstablecimientoComponent } from './autoridad-establecimiento.component';

describe('AutoridadEstablecimientoComponent', () => {
  let component: AutoridadEstablecimientoComponent;
  let fixture: ComponentFixture<AutoridadEstablecimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutoridadEstablecimientoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutoridadEstablecimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
