import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncabezadoCooperadoraComponent } from './encabezado-cooperadora.component';

describe('EncabezadoCooperadoraComponent', () => {
  let component: EncabezadoCooperadoraComponent;
  let fixture: ComponentFixture<EncabezadoCooperadoraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EncabezadoCooperadoraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EncabezadoCooperadoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
