import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FmplazadatoscomplementariosComponent } from './fmplazadatoscomplementarios.component';

describe('FmplazadatoscomplementariosComponent', () => {
  let component: FmplazadatoscomplementariosComponent;
  let fixture: ComponentFixture<FmplazadatoscomplementariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FmplazadatoscomplementariosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FmplazadatoscomplementariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
