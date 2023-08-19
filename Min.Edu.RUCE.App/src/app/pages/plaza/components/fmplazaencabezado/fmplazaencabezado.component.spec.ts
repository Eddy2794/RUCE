import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FmplazaencabezadoComponent } from './fmplazaencabezado.component';

describe('FmplazaencabezadoComponent', () => {
  let component: FmplazaencabezadoComponent;
  let fixture: ComponentFixture<FmplazaencabezadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FmplazaencabezadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FmplazaencabezadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
