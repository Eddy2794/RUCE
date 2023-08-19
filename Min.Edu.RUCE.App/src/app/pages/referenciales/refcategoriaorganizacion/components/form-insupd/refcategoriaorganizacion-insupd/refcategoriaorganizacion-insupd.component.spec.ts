import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefcategoriaorganizacionInsupdComponent } from './refcategoriaorganizacion-insupd.component';

describe('RefcategoriaorganizacionInsupdComponent', () => {
  let component: RefcategoriaorganizacionInsupdComponent;
  let fixture: ComponentFixture<RefcategoriaorganizacionInsupdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RefcategoriaorganizacionInsupdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RefcategoriaorganizacionInsupdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
