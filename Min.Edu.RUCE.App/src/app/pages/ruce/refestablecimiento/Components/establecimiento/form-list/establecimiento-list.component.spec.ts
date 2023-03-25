import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstablecimientoListComponent } from './establecimiento-list.component';

describe('EstablecimientoListComponent', () => {
  let component: EstablecimientoListComponent;
  let fixture: ComponentFixture<EstablecimientoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstablecimientoListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstablecimientoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
