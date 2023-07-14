import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefcategoriaorganizacionListComponent } from './refcategoriaorganizacion-list.component';

describe('RefcategoriaorganizacionListComponent', () => {
  let component: RefcategoriaorganizacionListComponent;
  let fixture: ComponentFixture<RefcategoriaorganizacionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RefcategoriaorganizacionListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RefcategoriaorganizacionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
