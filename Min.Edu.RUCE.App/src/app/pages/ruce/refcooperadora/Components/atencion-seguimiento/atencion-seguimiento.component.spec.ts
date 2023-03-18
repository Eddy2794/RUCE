import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtencionSeguimientoComponent } from './atencion-seguimiento.component';

describe('AtencionSeguimientoComponent', () => {
  let component: AtencionSeguimientoComponent;
  let fixture: ComponentFixture<AtencionSeguimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtencionSeguimientoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtencionSeguimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
