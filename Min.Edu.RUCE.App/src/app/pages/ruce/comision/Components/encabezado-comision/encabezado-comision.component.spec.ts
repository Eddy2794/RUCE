import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncabezadoComisionComponent } from './encabezado-comision.component';

describe('EncabezadoComisionComponent', () => {
  let component: EncabezadoComisionComponent;
  let fixture: ComponentFixture<EncabezadoComisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EncabezadoComisionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EncabezadoComisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
