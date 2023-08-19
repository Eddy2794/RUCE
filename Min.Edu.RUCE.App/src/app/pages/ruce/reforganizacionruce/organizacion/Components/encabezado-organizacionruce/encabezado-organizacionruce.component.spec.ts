import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncabezadoOrganizacionruceComponent } from './encabezado-organizacionruce.component';

describe('EncabezadoOrganizacionruceComponent', () => {
  let component: EncabezadoOrganizacionruceComponent;
  let fixture: ComponentFixture<EncabezadoOrganizacionruceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EncabezadoOrganizacionruceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EncabezadoOrganizacionruceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
