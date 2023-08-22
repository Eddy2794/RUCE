import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncabezadoPersoneriaComponent } from './encabezado-personeria.component';

describe('EncabezadoPersoneriaComponent', () => {
  let component: EncabezadoPersoneriaComponent;
  let fixture: ComponentFixture<EncabezadoPersoneriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EncabezadoPersoneriaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EncabezadoPersoneriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
