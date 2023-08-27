import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtencionSeguimientoInsupdComponent } from './atencion-seguimiento-insupd.component';

describe('AtencionSeguimientoInsupdComponent', () => {
  let component: AtencionSeguimientoInsupdComponent;
  let fixture: ComponentFixture<AtencionSeguimientoInsupdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtencionSeguimientoInsupdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtencionSeguimientoInsupdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
