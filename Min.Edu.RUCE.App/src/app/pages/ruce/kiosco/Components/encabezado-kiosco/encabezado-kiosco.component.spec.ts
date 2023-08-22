import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncabezadoKioscoComponent } from './encabezado-kiosco.component';

describe('EncabezadoKioscoComponent', () => {
  let component: EncabezadoKioscoComponent;
  let fixture: ComponentFixture<EncabezadoKioscoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EncabezadoKioscoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EncabezadoKioscoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
