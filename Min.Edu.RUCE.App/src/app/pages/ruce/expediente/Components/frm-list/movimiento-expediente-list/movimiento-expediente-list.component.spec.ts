import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovimientoExpedienteListComponent } from './movimiento-expediente-list.component';

describe('MovimientoExpedienteListComponent', () => {
  let component: MovimientoExpedienteListComponent;
  let fixture: ComponentFixture<MovimientoExpedienteListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovimientoExpedienteListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovimientoExpedienteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
