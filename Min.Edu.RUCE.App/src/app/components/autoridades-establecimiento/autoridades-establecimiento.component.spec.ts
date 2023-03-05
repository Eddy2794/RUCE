import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoridadesEstablecimientoComponent } from './autoridades-establecimiento.component';

describe('AutoridadesEstablecimientoComponent', () => {
  let component: AutoridadesEstablecimientoComponent;
  let fixture: ComponentFixture<AutoridadesEstablecimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutoridadesEstablecimientoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutoridadesEstablecimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
