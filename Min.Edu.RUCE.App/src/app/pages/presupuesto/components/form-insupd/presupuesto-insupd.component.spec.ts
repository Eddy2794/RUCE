import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresupuestoInsUpdComponent } from './presupuesto-insupd.component';

describe('PresupuestoInsupdComponent', () => {
  let component: PresupuestoInsUpdComponent;
  let fixture: ComponentFixture<PresupuestoInsUpdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PresupuestoInsUpdComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PresupuestoInsUpdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
